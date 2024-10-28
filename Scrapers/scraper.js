const express = require("express");
const puppeteer = require("puppeteer");
const Fuel = require("../models/country");

const urls = {
  gasoline: "https://www.globalpetrolprices.com/gasoline_prices/",
  diesel: "https://www.globalpetrolprices.com/diesel_prices/",
};

const scrapeFuelPrices = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let data = [];

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    data = await page.evaluate(() => {
      const rows = document.querySelectorAll("#graphic div div div");
      const prices = [];

      rows.forEach((row, index) => {
        const priceText = row.textContent.trim();
        const price = parseFloat(priceText.replace(/[^\d.-]/g, ""));
        if (!isNaN(price)) {
          prices.push(price);
        }
      });

      return prices;
    });
  } catch (err) {
    console.error("Error white scraping", err);
  } finally {
    await browser.close();
  }

  return data;
};

const scrapeCountryNames = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let countryData = [];

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    countryData = await page.evaluate(() => {
      const countries = [];
      const outsideLinksElement = document.querySelector("#outsideLinks");
      const countryLinks = outsideLinksElement.querySelectorAll(
        "a.graph_outside_link"
      );
      countryLinks.forEach((link) => {
        countries.push(link.textContent.trim());
      });
      return countries;
    });
  } catch (err) {
    console.error("Error while scraping names:", err);
  } finally {
    await browser.close();
  }

  return countryData;
};

const updateFuelPrices = async () => {
  try {
    const gasolineCountries = await scrapeCountryNames(urls.gasoline);
    const gasolinePrices = await scrapeFuelPrices(urls.gasoline);
    const dieselCountries = await scrapeCountryNames(urls.diesel);
    const dieselPrices = await scrapeFuelPrices(urls.diesel);

    const dieselPriceMap = {};
    dieselCountries.forEach((country, index) => {
      dieselPriceMap[country] = dieselPrices[index] || null;
    });

    const allData = gasolineCountries.map((country, index) => ({
      name: country,
      gasoline_price: gasolinePrices[index] || null,
      diesel_price: dieselPriceMap[country] || null,
      date: new Date(),
    }));

    const validData = allData.filter(
      (entry) => entry.gasoline_price !== null && entry.diesel_price !== null
    );

    await Fuel.deleteMany({});

    if (validData.length > 0) {
      await Fuel.insertMany(validData);
      console.log(`Updated: ${validData.length} records`);
    } else {
      console.log(`No data to update`);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { updateFuelPrices };

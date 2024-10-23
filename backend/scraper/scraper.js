const express = require("express");
const puppeteer = require("puppeteer");
const Fuel = require("../models/country");

const urls = {
  europe: "https://www.tolls.eu/fuel-prices",
  asia: "https://www.tolls.eu/fuel-prices-asia",
  america: "https://www.tolls.eu/fuel-prices-america",
};

const scrapeFuelPrices = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let data = [];
  try {
    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: "networkidle2" });

    data = await page.evaluate(() => {
      const rows = document.querySelectorAll(".tr");
      const regionData = [];

      rows.forEach((row) => {
        const countryDiv = row.querySelector(".th");
        const priceDivs = row.querySelectorAll(".td");

        if (countryDiv && priceDivs.length >= 2) {
          const country = countryDiv.innerText.trim();
          const gasoline_price_str =
            priceDivs[0]?.childNodes[0]?.textContent.trim() || "N/A";
          const diesel_price_str =
            priceDivs[1]?.childNodes[0]?.textContent.trim() || "N/A";

          const gasoline_price = parseFloat(
            gasoline_price_str.replace(/[^\d.-]/g, "")
          );
          const diesel_price = parseFloat(
            diesel_price_str.replace(/[^\d.-]/g, "")
          );

          console.log(
            `Country: ${country}, Gasoline Price: ${gasoline_price}, Diesel Price: ${diesel_price}`
          );
          if (!isNaN(gasoline_price) && !isNaN(diesel_price)) {
            regionData.push({ name: country, gasoline_price, diesel_price });
          }
        }
      });
      console.log("Scraped data:", regionData);
      return regionData;
    });
  } catch (error) {
    console.error("Error while navigating the page:", error);
  } finally {
    await browser.close();
  }

  return data;
};

const updateFuelPrices = async () => {
  const allData = [];

  for (const region in urls) {
    const data = await scrapeFuelPrices(urls[region]);
    allData.push(...data);
  }

  await Fuel.deleteMany({});

  if (allData.length > 0) {
    await Fuel.insertMany(allData);
    console.log(`Updated fuel prices for all regions`);
  } else {
    console.log(`No valid data to update for any region`);
  }
};

module.exports = { scrapeFuelPrices, updateFuelPrices };

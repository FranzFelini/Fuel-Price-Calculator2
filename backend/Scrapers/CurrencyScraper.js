const express = require("express");
const puppeteer = require("puppeteer");
const Currency = require("../models/currency");
const logger = require("../loggers/logger2.js");

const url = "https://currencyfreaks.com/historical/exchange-rates";

const scrapeCurrencyRates = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let ratedata = [];

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    ratedata = await page.evaluate(() => {
      const table = document.getElementById("fiat_currency_table");
      const rows = table.querySelectorAll("tr");
      const data = [];

      rows.forEach((row, index) => {
        if (index === 0) return;
        const cells = row.querySelectorAll("td");

        if (cells.length >= 4) {
          const country = cells[2].innerText.trim();
          const currencyRate = cells[3].innerText.trim();
          const currencydata = parseFloat(currencyRate.replace(/[^\d.-]/g, ""));

          if (!isNaN(currencydata)) {
            data.push({ name: country, value: currencydata });
          }
        }
      });
      console.log(data);
      return data;
    });
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }

  return ratedata;
};

const updateCurrencyRates = async () => {
  const currencies = await scrapeCurrencyRates(url);
  logger.info(`Scraped currency rates from the following source :  ${url}`);
  await Currency.deleteMany({});

  if (currencies.length > 0) {
    await Currency.insertMany(currencies);
    console.log(`Updated currency rates`);
  } else {
    console.log(`No data to update`);
  }
};

module.exports = { scrapeCurrencyRates, updateCurrencyRates };

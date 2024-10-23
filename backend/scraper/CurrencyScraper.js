const express = require("express");
const puppeteer = require("puppeteer");
const Currency = require("../models/currency"); // Ensure this path is correct

const url = "https://currencyfreaks.com/historical/exchange-rates";

const scrapeCurrencyRates = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let ratedata = [];

  try {
    console.log(`Navigating to ${url}`);
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

          console.log(`Country: ${country}, Rate: ${currencydata}`);

          if (!isNaN(currencydata)) {
            data.push({ name: country, value: currencydata });
          }
        }
      });
      console.log("Scraped data:", data);
      return data;
    });
  } catch (error) {
    console.error("Error while navigating the page:", error);
  } finally {
    await browser.close();
  }

  return ratedata;
};

(async () => {
  try {
    const data = await scrapeCurrencyRates(url);

    if (data.length > 0) {
      await Currency.insertMany(data);
      console.log("Inserted:", data);
    } else {
      console.log("No data to insert.");
    }
  } catch (err) {
    console.error("Error during scraping or insertion:", err);
  }
})();

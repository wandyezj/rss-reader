// import { test, expect } from "@playwright/test";
// import * as fs from "fs";
// import { navigateToMainPage } from "./navigateToMainPage";

// // can test individual function

// // Validate parser is working at a basic level
// test("parse xml", async ({ browser }) => {
//     const page = await navigateToMainPage(browser);
//     //const xml = fs.readFileSync("test-xml/npr.xml", "utf8");
//     const items = await page.evaluate(() => eval("lastParsed"));

//     const actualTitle = items[0].title;
//     const expectedTitle = "Scientists say a new epoch marked by human impact—the Anthropocene—began in 1950s";
//     expect(actualTitle).toBe(expectedTitle);
// });

// test("fetches and parses RSS", async ({ page }) => {
//     // await page.goto("http://localhost:8080");
//     // // Call the fetchAndParseRSS function with a valid RSS URL
//     // const items = await page.evaluate(() => fetchAndParseRss("https://feeds.npr.org/1001/rss.xml"));
//     // expect(items.length).toBeGreaterThan(0);
//     // // Wait for the first article to be added to the DOM
//     // const firstArticle = await page.waitForSelector("#insert div");
//     // // Check the contents of the first article
//     // expect(await firstArticle.$eval("h3", (node) => node.textContent)).toBe("Test Title");
//     // expect(await firstArticle.$eval("p", (node) => node.textContent)).toBe("Test Date");
//     // expect(await firstArticle.$eval("img", (node) => node.getAttribute("src"))).toBe("Test Image");
//     // expect(await firstArticle.$eval("p", (node) => node.textContent)).toBe("Test Description");
//     // expect(await firstArticle.$eval("a", (node) => node.getAttribute("href"))).toBe("Test Link");
//     // await page.evaluate(() => fetchAndParseRss("https://invalid-url.com/rss.xml"));
//     // page.on("console", (msg) => {
//     //     for (let i = 0; i < msg.args().length; ++i) expect(msg.args()[i]).toBe("Error: invalid URL");
//     // });
//     // await page.evaluate(() => fetchAndParseRss("https://empty-feed.com/rss.xml"));
//     // // Check that no new articles were added to the DOM and only the first article is present
//     // const articlesAfterEmptyFeed = await page.$$("#insert div");
//     // expect(articlesAfterEmptyFeed.length).toBe(1);
// });

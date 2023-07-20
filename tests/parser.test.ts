// import { test, expect } from "@playwright/test";
// import { fetchAndParseRSS } from "../src/parser";

// test("fetches and parses RSS", async ({ page }) => {
//     await page.goto("http://localhost:8080");

//     // Wait for the first article to be added to the DOM
//     const firstArticle = await page.waitForSelector("#insert div");

//     // Check the contents of the first article
//     const title = await firstArticle.$eval("h3", (node) => node.textContent);
//     expect(title && title.length).toBeGreaterThan(0);

//     const dateString = await firstArticle.$eval("p", (node) => node.textContent);
//     expect(dateString && !isNaN(new Date(dateString).getTime())).toBeTruthy();

//     // For image URL, first check if the node exists before getting its src attribute
//     const imageElement = await firstArticle.$("img");
//     const imageUrl = imageElement ? await imageElement.getAttribute("src") : undefined;
//     if (imageUrl) {
//         expect(
//             (() => {
//                 try {
//                     new URL(imageUrl);
//                     return true;
//                 } catch {
//                     return false;
//                 }
//             })()
//         ).toBeTruthy();
//     } else {
//         console.log("Image URL not found for this article.");
//     }

//     const description = await firstArticle.$eval("p", (node) => node.textContent);
//     expect(description && description.length).toBeGreaterThan(0);

//     const link = await firstArticle.$eval("a", (node) => node.getAttribute("href"));
//     expect(
//         link &&
//             (() => {
//                 try {
//                     new URL(link);
//                     return true;
//                 } catch {
//                     return false;
//                 }
//             })()
//     ).toBeTruthy();

//     await page.evaluate(() => fetchAndParseRSS("https://invalid-url.com/rss.xml"));

//     page.on("console", (msg) => {
//         for (let i = 0; i < msg.args().length; ++i) expect(msg.args()[i]).toBe("Error: invalid URL");
//     });

//     await page.evaluate(() => fetchAndParseRSS("https://empty-feed.com/rss.xml"));

//     // Check that no new articles were added to the DOM and only the first article is present
//     const articlesAfterEmptyFeed = await page.$$("#insert div");
//     expect(articlesAfterEmptyFeed.length).toBe(1);
// });

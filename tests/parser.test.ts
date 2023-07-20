import { test, expect } from "@playwright/test";
import { fetchAndParseRSS } from "../src/parser";

test("fetches and parses RSS", async ({ page }) => {
    await page.goto("http://localhost:8080");

   // Convert the function to a string and pass it to page.evaluate()
   await page.evaluate(`${fetchAndParseRSS.toString()};
   fetchAndParseRSS("https://feeds.npr.org/1001/rss.xml");
`);

    // Wait for the first article to be added to the DOM
    const firstArticle = await page.waitForSelector("#insert div");

    // Check the contents of the first article
    expect(await firstArticle.$eval("h3", (node) => node.textContent)).toBe("Test Title");
    expect(await firstArticle.$eval("p", (node) => node.textContent)).toBe("Test Date");
    expect(await firstArticle.$eval("img", (node) => node.getAttribute("src"))).toBe("Test Image");
    expect(await firstArticle.$eval("p", (node) => node.textContent)).toBe("Test Description");
    expect(await firstArticle.$eval("a", (node) => node.getAttribute("href"))).toBe("Test Link");

    await page.evaluate(() => fetchAndParseRSS("https://invalid-url.com/rss.xml"));

    page.on("console", (msg) => {
        for (let i = 0; i < msg.args().length; ++i) expect(msg.args()[i]).toBe("Error: invalid URL");
    });

    await page.evaluate(() => fetchAndParseRSS("https://empty-feed.com/rss.xml"));

    // Check that no new articles were added to the DOM and only the first article is present
    const articlesAfterEmptyFeed = await page.$$("#insert div");
    expect(articlesAfterEmptyFeed.length).toBe(1);
});

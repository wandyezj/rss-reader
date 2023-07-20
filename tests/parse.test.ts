import { test, expect } from "@playwright/test";
import { navigateToMainPage } from "./navigateToMainPage";

test("load rss", async ({ browser }) => {
    const page = await navigateToMainPage(browser);
    // Give it time to parse the feed, find a better way to do this.
    await page.waitForTimeout(2000);
    const testData = await page.evaluate(() =>
        eval(`
    (() => {
        debugger;
        return localStorage.getItem('test');
    })()`)
    );

    const items = JSON.parse(testData);
    expect(items.length).toBeGreaterThan(0);
});

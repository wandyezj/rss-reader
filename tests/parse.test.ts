// import { test, expect, Page, selectors } from "@playwright/test";
// import { navigateToMainPage } from "./navigateToMainPage";

// test("load rss", async ({ browser }) => {
//     const page = await navigateToMainPage(browser);
//     // Give it time to parse the feed, find a better way to do this.
//     await page.waitForTimeout(2000);
//     const testData = await page.evaluate(() =>
//         eval(`
//     (() => {
//         debugger;
//         return localStorage.getItem('test');
//     })()`)
//     );

//     const items = JSON.parse(testData);
//     expect(items.length).toBeGreaterThan(0);
// });

// async function waitForLoad(page: Page) {
//     // Give it time to parse the feed, find a better way to do this.
//     await page.waitForTimeout(2000);
// }

// function setTestId() {
//     selectors.setTestIdAttribute("id");
// }

// const idButtonAddFeed = "button-add-feed";

// test("Add Feed Button", async ({ browser }) => {
//     const page = await navigateToMainPage(browser);

//     await waitForLoad(page);
//     setTestId();
//     const button = page.getByTestId(idButtonAddFeed);
//     await button.click();

//     // Get the state
//     const stateData = await page.evaluate(() =>
//         eval(`
//     (() => {
//         debugger;
//         return localStorage.getItem('test');
//     })()`)
//     );

//     const state = JSON.parse(stateData);

//     expect(state.length).toBeGreaterThan(0);
// });

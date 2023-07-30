// // test/FeedState.test.ts

// import { expect, test } from "@playwright/test";
// import { addFeed, setActiveFeed, markItemAsViewed, getState } from "../../src/State/State";
// import { fetchAndParseRss } from "../../src/Parser/fetchAndParseRss";

// const feedUrl = "https://feeds.npr.org/1001/rss.xml"; // You can change this URL to test with different feeds
// const nonExistentFeedUrl = feedUrl.replace(".org", ".com"); // This should be a URL that doesn't exist in the feeds

// test("adds a feed", () => {
//     addFeed(feedUrl);
//     const state = getState();
//     expect(state.feeds).toContainEqual({ url: feedUrl, lastFetched: expect.any(Date), viewedItems: [] });
// });

// test("throws error when adding existing feed", () => {
//     expect(() => {
//         addFeed(feedUrl);
//         addFeed(feedUrl);
//     }).toThrow(`Feed with URL ${feedUrl} already exists`);
// });

// test("sets active feed", () => {
//     addFeed(feedUrl);
//     setActiveFeed(feedUrl);
//     const state = getState();
//     if (state.activeFeed) {
//         // Check if activeFeed is not null before accessing its properties
//         expect(state.activeFeed.url).toBe(feedUrl);
//     }
// });

// test("throws error when setting non-existent feed as active", () => {
//     expect(() => {
//         setActiveFeed(nonExistentFeedUrl);
//     }).toThrow("Feed not found");
// });

// test("marks item as viewed", async () => {
//     const items = await fetchAndParseRss(feedUrl);
//     addFeed(feedUrl);
//     markItemAsViewed(feedUrl, items[0]);
//     const state = getState();
//     // Assume that the 'viewedItems' property exists on 'Feed' and is initialized as an empty array
//     if (state.feeds[0].viewedItems) {
//         expect(state.feeds[0].viewedItems).toContain(items[0]);
//     }
// });

// test("throws error when marking item as viewed in non-existent feed", async () => {
//     const items = await fetchAndParseRss(nonExistentFeedUrl);
//     expect(() => {
//         markItemAsViewed(nonExistentFeedUrl, items[0]);
//     }).toThrow("Feed not found");
// });

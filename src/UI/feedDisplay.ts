// displayFeeds.ts
import { addFeed, getFeedState } from "../FeedState/FeedState";
import { fetchAndParseRSS } from "./parser.ts";

async function displayFeeds(RSS_URL: string): Promise<void> {
  console.log("Loading");
  try {
    // Fetch feed data from an API or source
    const feedData = await fetchFeedData(RSS_URL);

    // Add the feed to the FeedState
    addFeed(feedData.url, feedData.items);

    // Get the updated feed items from the FeedState
    const feedState = getFeedState();
    const feedItems = feedState.feeds.flatMap((feed) => feed.items);

    // Update the HTML with the new feed items
    displayFeedItems(feedItems);
  } catch (error) {
    console.error("Error displaying feed data:", error);
  }
}

async function fetchFeedData(RSS_URL: string): Promise<RSSFeedData> {
  try {
    const response = await fetch(RSS_URL);
    const data = await response.json();
    return data as RSSFeedData;
  } catch (error) {
    throw new Error("Error fetching feed data");
  }
}

function displayFeedItems(feedItems: string[]): void {
  const articleListElement = document.querySelector(".article-items");
  if (articleListElement) {
    articleListElement.innerHTML = ""; // Clear existing items

    // Loop through the feed items and create list items for each
    feedItems.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = item;
      listItem.appendChild(link);
      articleListElement.appendChild(listItem);
    });
  }
}

export { displayFeeds };

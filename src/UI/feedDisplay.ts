
// displayFeeds.ts
import { addFeed, getFeedState } from "../FeedState/FeedState";
import { fetchAndParseRss } from "../parser";

async function displayFeeds() {
    console.log("Please tell me you're working");

    try {
        const parserUrl = "https://feeds.npr.org/1001/rss.xml";
        // Fetch and parse the RSS feed
        const rssItems = await fetchAndParseRss(parserUrl);

        // Prepare data for FeedState
        const feedUrl = parserUrl; // URL of the feed
        const feedItems = rssItems.map((item) => item.title || ""); // Get titles of the items

        // Add the feed to the FeedState
        addFeed(feedUrl, feedItems);

    console.log("Please tell me your working");

    try {
        const parserUrl = "your_parser_url"; // Replace with your parser URL
        // Fetch and parse the RSS feed
        const rssItems = await fetchAndParseRss(parserUrl);

        // Prepare data for FeedState
        const feedUrl = parserUrl; // URL of the feed
        const feedItems = rssItems.map((item) => item.title || ""); // Get titles of the items

import { RssItem, fetchAndParseRss } from "../parser";
import { addFeed, getFeedState, Feed } from "../FeedState/FeedState";

async function displayFeeds(RSS_URL: string): Promise<void> {
    console.log("Loading");
    try {
        // Fetch and parse the RSS feed using the parser
        const feedItems: RssItem[] = await fetchAndParseRss(RSS_URL);

        // Prepare data for FeedState
        const feedUrl = RSS_URL; // URL of the feed


        // Add the feed to the FeedState
        addFeed(feedUrl, feedItems);

        // Get the updated feed state
        const feedState = getFeedState();

        // Update the HTML with the new feed items and the expanded article
        displayFeedItems(feedState.feeds);
        displayExpandedArticle(feedState.feeds[0], feedState.feeds[0].items[0]); // Assuming the first feed and its first item are selected by default
    } catch (error) {
        console.error("Error displaying feed data:", error);
    }
}

function displayFeedItems(feeds: Feed[]): void {
    const articleListElement = document.querySelector(".article-items");
    if (articleListElement) {
        articleListElement.innerHTML = ""; // Clear existing items

        // Loop through the feed items and create list items for each
        feeds.forEach((feed) => {
            feed.items.forEach((item) => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = "#";
                link.textContent = item.description || "";
                listItem.appendChild(link);
                articleListElement.appendChild(listItem);

                // Add click event listener to display the selected article on click
                link.addEventListener("click", () => displayExpandedArticle(feed, item));
            });
        });
    }
}

function displayExpandedArticle(feed: Feed, title: RssItem): void {
    // Find the corresponding RssItem based on the title
    const selectedRssItem = feed.items.find((item) => item.title === title.title);

    // Update the expanded article view with the selected RssItem details
    const expandedArticleImageElement = document.querySelector(".expanded-article-image");
    const articleTitleElement = document.querySelector(".expanded-article-title");
    const articleContentElement = document.querySelector(".expanded-article-content");

    if (
        expandedArticleImageElement instanceof HTMLElement &&
        articleTitleElement instanceof HTMLElement &&
        articleContentElement instanceof HTMLElement
    ) {
        if (selectedRssItem) {
            // Update the expanded article with the selected RSS item's details
            expandedArticleImageElement.style.backgroundImage = `url(${selectedRssItem.image || ""})`;
            articleTitleElement.textContent = selectedRssItem.title || "No Title";
            articleContentElement.textContent = selectedRssItem.description || "No Description";
        } else {
            // If the selected item is not found, reset the expanded article
            expandedArticleImageElement.style.backgroundImage = "none";
            articleTitleElement.textContent = "No Title";
            articleContentElement.textContent = "No Description";
        }
    } catch (error) {
        console.error("Error fetching, parsing, or displaying feed data:", error);

    }
}

export { displayFeeds };

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

        // Update the HTML with the new feed items
        const feedState = getFeedState();
        const articleListElement = document.querySelector(".article-items");
        if (articleListElement) {
            articleListElement.innerHTML = ""; // Clear existing items

            // Loop through the feed items and create list items for each
            feedState.feeds.forEach((feed) => {
                feed.items.forEach((item) => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = "#";
                    link.textContent = item;
                    listItem.appendChild(link);
                    articleListElement.appendChild(listItem);
                });
            });
        }
    } catch (error) {
        console.error("Error fetching, parsing, or displaying feed data:", error);
    }
}

// Export the function so it can be used in other files
export { displayFeeds };

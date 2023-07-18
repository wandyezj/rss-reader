// displayFeeds.ts
import { addFeed, getFeedState } from "../FeedState/FeedState";
async function displayFeeds() {
    console.log("Please tell me your working");
    try {
        // Fetch feed data from an API or source
        const response = await fetch("parser_URL");
        const data = await response.json();

        // Add the feed to the FeedState
        addFeed(data.url, data.items);

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
        console.error("Error fetching or displaying feed data:", error);
    }
}

// Export the function so it can be used in other files
export { displayFeeds };

import { fetchAndParseRss } from "./Parser/fetchAndParseRss";
import { refreshFeed } from "./State/State";
import { displayFeed, displayExpandedArticle, addFeedClickedEvent } from "./UI/displayFeed";
import { refreshFeeds } from "./refreshFeeds";
import { registerButtonAddFeed } from "./registerButtonAddFeed";
import { registerButtonRefresh } from "./registerButtonRefresh";
import { registerButtonStateDownload } from "./registerButtonStateDownload";
import { registerButtonStateUpload } from "./registerButtonStateUpload";
import { website, clock } from "./website";
import { addFeed } from "./State/State";

console.log(website());
clock();

/**
 * Initialize the application
 * register button handlers
 */
function initialize() {
    // Button Handlers
    registerButtonAddFeed();
    registerButtonRefresh();
    registerButtonStateUpload();
    registerButtonStateDownload();
    displayFeed();
    // reload all feeds
    refreshFeeds();
    // Add event listeners to feed links
    addFeedClickedEvent();

    // Event listener for the "Add RSS Feed" button
    document.getElementById("button-add-feed")?.addEventListener("click", async () => {
        const urlInput = document.getElementById("add-feed-input") as HTMLInputElement;
        const url = urlInput.value.trim();
        if (url) {
            try {
                const rssItems = await fetchAndParseRss(url);
                addFeed(url, rssItems);
                console.log(`RSS feed from ${url} has been added.`);
                displayFeed(); // Refresh the feed display
            } catch (error) {
                console.error(`Failed to add RSS feed from ${url}:`, error);
            }
        } else {
            console.error("No URL was entered.");
        }
    });
}
initialize();

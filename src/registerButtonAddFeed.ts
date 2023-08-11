import { displayFeed } from "./UI/displayFeed";
import { loadRssUrls } from "./loadRssUrls";

/**
 * Add a new Rss Feed
 */
export function registerButtonAddFeed() {
    const link = document.getElementById("button-add-feed");
    if (!link) return; // Check if the link element exists

    // Event listener for the "Add RSS Feed" button
    link.addEventListener("click", async () => {
        const urlInput = document.getElementById("add-feed-input") as HTMLInputElement;
        const url = urlInput.value.trim();
        if (url) {
            await loadRssUrls([url]);
            displayFeed(); // Refresh the feed display
        } else {
            console.error("No URL was entered.");
        }
    });
}

import { clearState } from "./State/State";
import { displayFeed } from "./UI/displayFeed";

/**
 * Add a new Rss Feed
 */
export function registerButtonClearState() {
    const id = "button-clear-state";
    const link = document.getElementById(id);
    if (!link) {
        console.error(`Element with id ${id} not found.`);
        return; // Check if the link element exists
    }

    // Event listener for the "Add RSS Feed" button
    link.addEventListener("click", async () => {
        console.log("Click Clear State");
        clearState();
        displayFeed(); // Refresh the feed display
    });
}

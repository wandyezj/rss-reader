import { getButton } from "./getButton";
import { refreshFeeds } from "./refreshFeeds";

/**
 * Refresh all items in the feed
 */
export function registerButtonRefresh() {
    const link = document.querySelector("#button-refresh");
    if (!link) return; // Check if the link element exists

    link.addEventListener("click", async (event) => {
        event.preventDefault();

        await refreshFeeds();
    });
}

import { getButton } from "./getButton";
import { refreshFeeds } from "./refreshFeeds";

/**
 * Refresh all items in the feed
 */
export function registerButtonRefresh() {
    const button = getButton("button-refresh");

    button.onclick = async function () {
        await refreshFeeds();
    };
}

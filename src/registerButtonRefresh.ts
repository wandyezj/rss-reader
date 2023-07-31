import { getState } from "./State/State";
import { displayFeed } from "./UI/displayFeed";
import { getButton } from "./getButton";
import { loadRssUrls } from "./loadRssUrls";

/**
 * Refresh all items in the feed
 */
export function registerButtonRefresh() {
    const button = getButton("button-refresh");

    button.onclick = async function () {
        const state = getState();
        const rssUrls = state.feeds.map((feed) => feed.url);
        await loadRssUrls(rssUrls);
        displayFeed();
    };
}

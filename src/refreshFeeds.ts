import { getState } from "./State/State";
import { displayFeed } from "./UI/displayFeed";
import { loadRssUrls } from "./loadRssUrls";

/**
 * Refresh all items in the feed
 */

export async function refreshFeeds() {
    const state = getState();
    const rssUrls = state.feeds.map((feed) => feed.url);
    await loadRssUrls(rssUrls);
    displayFeed();
}

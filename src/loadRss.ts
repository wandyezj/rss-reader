import { fetchAndParseRss } from "./Parser/fetchAndParseRss";
import { RssItem } from "./State/RssItem";
import { addFeed } from "./State/State";

export async function loadRss(rssFeedUrl: string): Promise<void> {
    console.log("Loading");
    let feedItems: RssItem[] = [];

    try {
        // Fetch and parse the RSS feed using the parser
        feedItems = await fetchAndParseRss(rssFeedUrl);
    } catch (error) {
        console.error(`Error fetching, or parsing feed ${rssFeedUrl}:`, error);
    }

    // Add the feed to the FeedState
    addFeed(rssFeedUrl, feedItems);
}

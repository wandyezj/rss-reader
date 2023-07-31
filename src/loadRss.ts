import { fetchAndParseRss } from "./Parser/fetchAndParseRss";
import { RssItem } from "./State/RssItem";
import { addFeed } from "./State/State";

export async function loadRss(rssFeedUrl: string): Promise<void> {
    console.log(`Loading... ${rssFeedUrl}`);
    let feedItems: RssItem[] = [];

    try {
        // Fetch and parse the RSS feed using the parser
        feedItems = await fetchAndParseRss(rssFeedUrl);
        console.log(`Loaded: ${rssFeedUrl}`);
    } catch (error) {
        console.error(`Error fetching, or parsing feed ${rssFeedUrl}:`, error);
    }

    // Add the feed to the FeedState
    addFeed(rssFeedUrl, feedItems);
}

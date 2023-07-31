import { fetchAndParseRss } from "./Parser/fetchAndParseRss";
import { fetchRssXml } from "./Parser/fetchRssXml";
import { parseRssXml } from "./Parser/parseRssXml";
import { RssItem } from "./State/RssItem";
import { addFeed } from "./State/State";

export async function loadRss(rssFeedUrl: string): Promise<void> {
    console.log(`Loading... ${rssFeedUrl}`);
    let xml = "";
    let items: RssItem[] = [];

    try {
        // Fetch and parse the RSS feed using the parser
        xml = await fetchRssXml(rssFeedUrl);
        console.log(`${rssFeedUrl} Loaded`);
    } catch (error) {
        console.error(`${rssFeedUrl} Error fetching:`, error);
    }

    if (xml !== "") {
        try {
            items = parseRssXml(xml);
            console.log(`${rssFeedUrl} Parsed`);
        } catch (error) {
            console.error(`${rssFeedUrl} Error parsing:`, error);
        }
    }

    // Add the feed to the FeedState
    addFeed(rssFeedUrl, items);
}

import { RssItem } from "../RssItem";
import { fetchRssXml } from "./fetchRssXml";
import { parseRssXml } from "./parseRssXml";

/**
 * retrieve RSS feed from specified URL and parse it into RSS items
 * @param rssUrl
 * @returns
 */
export async function fetchAndParseRss(rssUrl: string): Promise<RssItem[]> {
    const xml = await fetchRssXml(rssUrl);
    const items = parseRssXml(xml);
    return items;
}

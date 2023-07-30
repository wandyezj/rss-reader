import { RssItem } from "./RssItem";

/**
 * retrieve RSS feed from specified URL and parse it into RSS items
 * @param rssUrl
 * @returns
 */
export async function fetchAndParseRss(rssUrl: string): Promise<RssItem[]> {
    const xml = await fetchRssXml(rssUrl);
    const items = parseRss(xml);
    return items;
}

/**
 * Fetches RSS xml from url
 * @param rssUrl url of rss to fetch
 * @returns rss xml as string
 */
export async function fetchRssXml(rssUrl: string): Promise<string> {
    const response = await fetch(rssUrl);
    const text = await response.text();
    return text;
}

/**
 * Parse RSS XML into RSS items
 * @param xml
 * @returns list of rss items parsed from XML
 */
export function parseRss(xml: string): RssItem[] {
    const data = new window.DOMParser().parseFromString(xml, "text/xml");

    const items = data.getElementsByTagName("item");
    const rssItems: RssItem[] = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        function getTagValue(item: Element, tagName: string): string | undefined {
            const tag = item.getElementsByTagName(tagName)[0];
            const value = tag.textContent || undefined;
            return value;
        }

        // Parse individual items values
        const title = getTagValue(item, "title");
        const pubDate = getTagValue(item, "pubDate");
        const image = item.getElementsByTagName("img")[0]?.getAttribute("src") || undefined;
        const description = item.getElementsByTagName("description")[0].textContent || undefined;
        const link = getTagValue(item, "link");

        const rssItem: RssItem = {
            title,
            pubDate,
            image,
            description,
            link,
        };
        rssItems.push(rssItem);
    }
    return rssItems;
}

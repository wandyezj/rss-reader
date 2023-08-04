import { RssItem } from "../State/RssItem";

/**
 * Parse RSS XML into RSS items
 * @param xml
 * @returns list of rss items parsed from XML
 */
export function parseRssXml(xml: string): RssItem[] {
    // Some feeds use the Atom format these require slightly different parsing logic
    // TODO: detect if this is an atom feed and switch over the parser

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
        const guid = getTagValue(item, "guid");
        const title = getTagValue(item, "title");
        const pubDate = getTagValue(item, "pubDate");
        const image = item.getElementsByTagName("img")[0]?.getAttribute("src") || undefined;
        const description = item.getElementsByTagName("description")[0].textContent || undefined;
        const link = getTagValue(item, "link");

        // Way to uniquely identify the item in the feed - ideally preserved across loads
        const id = guid || title || link || pubDate || "guid";

        const rssItem: RssItem = {
            id,
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

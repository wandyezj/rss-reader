import { RssItem } from "../State/RssItem";

/**
 * Parse RSS XML into RSS items
 * @param xml
 * @returns list of rss items parsed from XML
 */
export function parseRssXml(xml: string): RssItem[] {
    const data = new window.DOMParser().parseFromString(xml, "text/xml");
    const feedType = data.getElementsByTagName("feed")[0] ? "atom" : "rss";

    if (feedType === "atom") {
        return parseAtomXml(data);
    } else {
        return parseRssItems(data);
    }
}

function getTagValue(item: Element, tagName: string): string | undefined {
    const tag = item.getElementsByTagName(tagName)[0];
    const value = tag?.textContent || undefined;
    return value;
}

function parseRssItems(data: Document): RssItem[] {
    const items = data.getElementsByTagName("item");
    const rssItems: RssItem[] = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const guid = getTagValue(item, "guid");
        const title = getTagValue(item, "title");
        const pubDate = getTagValue(item, "pubDate");
        const image = item.getElementsByTagName("img")[0]?.getAttribute("src") || undefined;
        const description = getTagValue(item, "description");
        const link = getTagValue(item, "link");
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

function parseAtomXml(data: Document): RssItem[] {
    const entries = data.getElementsByTagName("entry");
    const rssItems: RssItem[] = [];

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const id = getTagValue(entry, "id") || '';
        const title = getTagValue(entry, "title");
        const pubDate = getTagValue(entry, "published");
        const image = undefined; // Atom feeds might not have images
        const description = getFirstSentence(getTagValue(entry, "content"));
        const link = entry.getElementsByTagName("link")[0]?.getAttribute("href") || "";

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

function getFirstSentence(text: string | undefined): string | undefined {
    if (text) {
        const sentences = text.split(/[.!?]/);
        return sentences[0].trim();
    }
    return undefined;
}

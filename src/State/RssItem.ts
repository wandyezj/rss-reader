/**
 * Single Item in the RSS Feed
 */
export interface RssItem {
    /**
     * guid to uniquely identify the item in the feed
     */
    id: string;

    title?: string;
    pubDate?: string;
    image?: string;
    description?: string;
    link?: string;
}

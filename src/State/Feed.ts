import { RssItem } from "./RssItem";

export interface Feed {
    /**
     * URL is the id for the feed
     */
    url: string;
    lastFetched: Date;
    items: RssItem[];

    /**
     * ids of the items that have been viewed
     */
    viewedItemIds: string[];
}

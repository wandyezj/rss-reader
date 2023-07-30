import { RssItem } from "../parser";

export interface Feed {
    url: string;
    lastFetched: Date;
    items: RssItem[];
    viewedItems?: RssItem[];
}

export interface FeedState {
    feeds: Feed[];
    activeFeed: Feed | null;
}
// Path: src/FeedState/FeedState.ts

export interface Feed {
    url: string;
    lastFetched: Date;
    items: string[];
    viewedItems?: string[];
}

export interface FeedState {
    feeds: Feed[];
    activeFeed: Feed | null;
}

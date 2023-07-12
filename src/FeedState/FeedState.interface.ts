export interface Feed {
    url: string;
    lastFetched: Date;
    items: string[];
}

export interface FeedState {
    feeds: Feed[];
    activeFeed: Feed | null;
}
// Path: src/FeedState/FeedState.ts

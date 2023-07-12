// TypeScript file for FeedState
import { Feed, FeedState } from "./FeedState.interface";

let state: FeedState = {
    feeds: [],
    activeFeed: null,
};

export function addFeed(url: string, items: string[] = []): void {
    if (state.feeds.some((feed) => feed.url === url)) {
        throw new Error(`Feed with URL ${url} already exists`);
    }

    const newFeed: Feed = {
        url,
        lastFetched: new Date(),
        items,
    };

    state.feeds.push(newFeed);
    localStorage.setItem(url, JSON.stringify(items));
}

export function refreshFeed(url: string, newItems: string[]): void {
    const feed = state.feeds.find((feed) => feed.url === url);
    if (feed) {
        const storedItems = JSON.parse(localStorage.getItem(url) || "[]");
        const uniqueNewItems = newItems.filter((item) => !storedItems.includes(item));

        if (uniqueNewItems.length > 0) {
            feed.items.push(...uniqueNewItems);
            feed.lastFetched = new Date();
            localStorage.setItem(url, JSON.stringify(feed.items));
        } else {
            throw new Error("No new items to fetch");
        }
    } else {
        throw new Error("Feed not found");
    }
}

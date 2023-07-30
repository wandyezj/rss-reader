// TypeScript file for FeedState
import { Feed } from "./Feed";
import { RssItem } from "./RssItem";

/**
 * The overall state of the application
 */
export interface State {
    feeds: Feed[];

    /**
     * The URL of the feed that is currently being viewed?
     */
    activeFeedUrl: string | null;
}

/**
 * Global state variable
 */
let globalState: State | undefined = undefined;

const stateKey = "state";

/**
 * Update the state in local storage from the global state
 */
function updateState() {
    localStorage.setItem(stateKey, JSON.stringify(globalState));
}

export function setState(state: State): void {
    globalState = state;
    updateState();
}

/**
 * Get the global state.
 * get current globalState, from object, local storage, od default to starting state.
 */
export function getState(): State {
    // if already loaded, return the global state.
    if (globalState) {
        return globalState;
    }

    // otherwise, attempt to load from local storage.
    const data = localStorage.getItem(stateKey);
    if (data !== null) {
        globalState = JSON.parse(data);
    }

    // global state was not loaded from storage, so default to starting state.
    if (globalState === undefined) {
        const startingState: State = {
            feeds: [],
            activeFeedUrl: null,
        };
        globalState = startingState;
    }

    return globalState;
}

function getFeedByUrl(url: string): Feed | undefined {
    const state = getState();
    return state.feeds.find((feed) => feed.url === url);
}

export function addFeed(url: string, items: RssItem[] = []): void {
    const state = getState();
    if (state.feeds.some((feed) => feed.url === url)) {
        throw new Error(`Feed with URL ${url} already exists`);
    }

    const newFeed: Feed = {
        url,
        lastFetched: new Date(),
        items,
        viewedItemIds: [],
    };

    state.feeds.push(newFeed);
    updateState();
}

export function refreshFeed(url: string, newItems: RssItem[]): void {
    const feed = getFeedByUrl(url);
    if (feed === undefined) {
        throw new Error("Feed not found");
    }

    const storedItems = JSON.parse(localStorage.getItem(url) || "[]");
    const uniqueNewItems = newItems.filter((item) => !storedItems.includes(item));

    if (uniqueNewItems.length === 0) {
        throw new Error("No new items to fetch");
    }

    feed.items.push(...uniqueNewItems);
    feed.lastFetched = new Date();
    updateState();
}

export function setActiveFeed(url: string): void {
    const state = getState();
    const feed = getFeedByUrl(url);
    if (feed) {
        state.activeFeedUrl = feed.url;
    } else {
        throw new Error("Feed not found");
    }
}

export function markItemAsViewed(url: string, item: RssItem): void {
    const feed = getFeedByUrl(url);

    if (feed === undefined) {
        throw new Error("Feed not found");
    }

    const index = feed.items.indexOf(item);
    if (index === -1) {
        throw new Error("Item not found in feed");
    }

    feed.items.splice(index, 1); // this removes the item
    // add any additional logic you need when an item is viewed
}
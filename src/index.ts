import { RssItem, fetchAndParseRss } from "./parser";
import { addFeed, setActiveFeed, markItemAsViewed, getFeedState } from "./FeedState/FeedState";
import { saveSettings, loadSettings, downloadSettings, uploadSettings } from "./settings";
import { website, clock } from "./website";
import { displayFeeds } from "./UI/feedDisplay"; // Import displayFeeds from UI

console.log(website());
clock();

function initialize() {
    // Register button handlers
    document.getElementById("button-add-feed")?.addEventListener("click", () => {
        debugger;
        addFeed("https://feeds.npr.org/1001/rss.xml");
    });
}

initialize();

export async function test(testUrl: string) {
    console.log("test");
    debugger;

    const items = await fetchAndParseRss(testUrl);
    console.log(items);

    // Map the parsed items to the format expected by addFeed and filter out any undefined values
    const feedItems = items.map((item) => item.title).filter((title): title is string => title !== undefined);

    // Add the feed data to the state
    addFeed(testUrl, feedItems);

    // Set the active feed
    setActiveFeed(testUrl);

    // Display the feeds
    displayFeeds(); // Call displayFeeds

    localStorage.setItem("test", JSON.stringify(items));

    return items;
}

//const testUrl = 'https://feeds.npr.org/1001/rss.xml';
const testUrl = "test-xml/npr.xml";
test(testUrl);

function test2() {
    // How do we call these automatically?
    addFeed("https://feeds.npr.org/1001/rss.xml");
    setActiveFeed("https://feeds.npr.org/1001/rss.xml");
    markItemAsViewed("https://feeds.npr.org/1001/rss.xml", "Item 1");

    const currentState = getFeedState();
    console.log(currentState);

    saveSettings(currentState);
    const loadedSettings = loadSettings();
    console.log(loadedSettings);
}

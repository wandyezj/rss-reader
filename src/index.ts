import { RssItem, fetchAndParseRss } from "./parser";
import { addFeed, setActiveFeed, markItemAsViewed, getFeedState } from "./FeedState/FeedState";
import { saveSettings, loadSettings, downloadSettings, uploadSettings } from "./settings";
import { website, clock } from "./website";

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
    localStorage.setItem("test", JSON.stringify(items));

    return items;
}

//const testUrl = 'https://feeds.npr.org/1001/rss.xml';
const testUrl = "test-xml/npr.xml";

async function test2() {
    try {
        const items = await test("https://feeds.npr.org/1001/rss.xml");
        // How do we call these automatically?
        addFeed("https://feeds.npr.org/1001/rss.xml");
        setActiveFeed("https://feeds.npr.org/1001/rss.xml");

        markItemAsViewed("https://feeds.npr.org/1001/rss.xml", items[0]);

        const currentState = getFeedState();
        console.log(currentState);

        saveSettings(currentState);
        const loadedSettings = loadSettings();
        console.log(loadedSettings);
    } catch (error) {
        console.error("Error fetching RSS items:", error);
    }
}

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
test(testUrl);

function test2() {
    // How do we call these automatically?
    addFeed("https://feeds.npr.org/1001/rss.xml");
    setActiveFeed("https://feeds.npr.org/1001/rss.xml");
    markItemAsViewed("https://feeds.npr.org/1001/rss.xml", "Item 1");

const currentState = getFeedState();
console.log(currentState);

function initialize() {
    // Add feed button
    document.getElementById("add-feed-button")?.addEventListener("click", async () => {
        debugger;
        try {
            // Add multiple feeds
            const feedUrls = [
                "https://feeds.npr.org/1001/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
                "https://feeds.foxnews.com/foxnews/latest",
                "https://www.cbsnews.com/latest/rss/main",
                "http://rss.cnn.com/rss/cnn_topstories.rss",
            ];
            for (const url of feedUrls) {
                await addFeed(url);
            }
        } catch (error) {
            console.error("Failed to add feed", error);
        }
    });
 
    const currentState = getFeedState();
    console.log(currentState);


    saveSettings(currentState);
    const loadedSettings = loadSettings();
    console.log(loadedSettings);
}

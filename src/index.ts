import { RssItem, fetchAndParseRss } from "./parser";
import { addFeed, setActiveFeed, markItemAsViewed, getFeedState } from "./FeedState/FeedState";
import { saveSettings, loadSettings, downloadSettings, uploadSettings } from "./settings";
import { website, clock } from "./website";

console.log(website());
clock();
console.log(website());

export let lastParsed: RssItem[] = [];
async function test(testUrl: string) {
    console.log("test");
    //debugger;

    const items = await fetchAndParseRss(testUrl);
    console.log(items);
    lastParsed = items;
    return items;
}

//const testUrl = 'https://feeds.npr.org/1001/rss.xml';
const testUrl = "test-xml/npr.xml";
test(testUrl);

addFeed("https://feeds.npr.org/1001/rss.xml");
setActiveFeed("https://feeds.npr.org/1001/rss.xml");
markItemAsViewed("https://feeds.npr.org/1001/rss.xml", "Item 1");

const currentState = getFeedState();
console.log(currentState);

saveSettings(currentState);
const loadedSettings = loadSettings();
console.log(loadedSettings);

console.log(website());
import { website, clock } from "./website";
clock();
console.log(website());
import { addFeed, setActiveFeed, markItemAsViewed, getFeedState } from "./FeedState/FeedState";
import { saveSettings, loadSettings, downloadSettings, uploadSettings } from "./settings";

addFeed("https://feeds.npr.org/1001/rss.xml");
setActiveFeed("https://feeds.npr.org/1001/rss.xml");
markItemAsViewed("https://feeds.npr.org/1001/rss.xml", "Item 1");

const currentState = getFeedState();
console.log(currentState);

saveSettings(currentState);
const loadedSettings = loadSettings();
console.log(loadedSettings);

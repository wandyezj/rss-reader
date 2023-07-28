console.log(website());
import { website, clock } from "./website";
clock();
console.log(website());
import { addFeed, setActiveFeed, markItemAsViewed, getFeedState } from "./FeedState/FeedState";
import { saveSettings, loadSettings, downloadSettings, uploadSettings } from "./settings";

addFeed("https://feeds.npr.org/1001/rss.xml");
setActiveFeed("https://feeds.npr.org/1001/rss.xml");
markItemAsViewed("https://feeds.npr.org/1001/rss.xml", "Item 1");

<<<<<<< Updated upstream
const currentState = getFeedState();
console.log(currentState);
=======
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
>>>>>>> Stashed changes

saveSettings(currentState);
const loadedSettings = loadSettings();
console.log(loadedSettings);

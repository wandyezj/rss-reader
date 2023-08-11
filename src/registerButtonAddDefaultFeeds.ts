import { displayFeed } from "./UI/displayFeed";
import { loadRssUrls } from "./loadRssUrls";

// Add multiple feeds
const rssUrls = [
    "https://feeds.npr.org/1001/rss.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    "https://feeds.foxnews.com/foxnews/latest",
    "https://www.cbsnews.com/latest/rss/main",
    "https://feeds.arstechnica.com/arstechnica/index",
    "https://wandyezj.github.io/feed",
    "https://xkcd.com/rss.xml",
    "https://techcrunch.com/feed/",

    // URL is configured to rely on same origin policy...
    //"http://rss.cnn.com/rss/cnn_topstories.rss",
];

/**
 * Add a new Rss Feed
 */
export function registerButtonAddDefaultFeeds() {
    const link = document.getElementById("button-add-default-feeds");
    if (!link) return; // Check if the link element exists

    link.addEventListener("click", async (event) => {
        event.preventDefault();

        await loadRssUrls(rssUrls);
        displayFeed();
    });
}

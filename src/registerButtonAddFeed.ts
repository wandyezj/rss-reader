import { addFeed } from "./State/State";
import { displayFeed } from "./UI/displayFeed";
import { getButton } from "./getButton";
import { loadRss } from "./loadRss";
import { loadRssUrls } from "./loadRssUrls";

/**
 * Add a new Rss Feed
 */
export function registerButtonAddFeed() {
    const button = getButton("button-add-feed");

    button.onclick = async function () {
        // Add multiple feeds
        const rssUrls = [
            "https://feeds.npr.org/1001/rss.xml",
            "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
            "https://feeds.foxnews.com/foxnews/latest",
            "https://www.cbsnews.com/latest/rss/main",
            "http://rss.cnn.com/rss/cnn_topstories.rss",
        ];

        await loadRssUrls(rssUrls);

        // display all loaded feeds
        displayFeed();
    };
}

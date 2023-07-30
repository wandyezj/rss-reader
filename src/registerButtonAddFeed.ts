import { addFeed } from "./State/State";
import { getButton } from "./getButton";

export function registerButtonAddFeed() {
    const button = getButton("button-add-feed");

    button.onclick = async function () {
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
    };
}

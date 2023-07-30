import { addFeed } from "./State/State";

export function registerButtonAddFeed() {
    document.getElementById("button-add-feed")?.addEventListener("click", async () => {
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
}

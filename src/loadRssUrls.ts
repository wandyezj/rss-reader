import { loadRss } from "./loadRss";

export async function loadRssUrls(rssUrls: string[]) {
    const loadPromises = rssUrls.map((rssUrl) =>
        loadRss(rssUrl).catch((error) => {
            console.error("Failed to add feed", error);
        })
    );
    await Promise.all(loadPromises);
}

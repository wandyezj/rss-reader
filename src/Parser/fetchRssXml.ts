/**
 * Fetches RSS xml from url
 * @param rssUrl url of rss to fetch
 * @returns rss xml as string
 */
export async function fetchRssXml(rssUrl: string): Promise<string> {
    const response = await fetch(rssUrl);
    const text = await response.text();
    return text;
}

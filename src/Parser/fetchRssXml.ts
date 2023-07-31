/**
 * Fetches RSS xml from url
 * @param rssUrl url of rss to fetch
 * @returns rss xml as string
 */
export async function fetchRssXml(rssUrl: string): Promise<string> {
    const response = await fetch(rssUrl, {
        //mode: "no-cors",
        mode: "cors",
    });
    console.log(`fetch url ${rssUrl} status ${response.status}`);
    const text = await response.text();
    console.log(`fetch url ${rssUrl} ${text === "" ? "empty text" : "SUCCESS!"}`);

    return text;
}

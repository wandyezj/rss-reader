import { website, clock } from "./website";
clock();
console.log(website());

import { RssItem, fetchAndParseRss } from "./parser";

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

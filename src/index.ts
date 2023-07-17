import { website, clock } from "./website";
clock();
console.log(website());

import { fetchAndParseRSS } from "./parser";

const RSS_URL = "test-xml/feeds.npr.org_1001_rss.xml";
fetchAndParseRSS(RSS_URL);

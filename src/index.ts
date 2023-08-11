import { fetchAndParseRss } from "./Parser/fetchAndParseRss";
import { refreshFeed } from "./State/State";
import { displayFeed, displayExpandedArticle, addFeedClickedEvent } from "./UI/displayFeed";
import { refreshFeeds } from "./refreshFeeds";
import { registerButtonAddFeed } from "./registerButtonAddFeed";
import { registerButtonRefresh } from "./registerButtonRefresh";
import { registerButtonStateDownload } from "./registerButtonStateDownload";
import { registerButtonStateUpload } from "./registerButtonStateUpload";
import { website, clock } from "./website";
import { addFeed } from "./State/State";
import { registerButtonAddDefaultFeeds } from "./registerButtonAddDefaultFeeds";
import { registerButtonClearState } from "./registerButtonClearState";

console.log(website());
clock();

/**
 * Initialize the application
 * register button handlers
 */
function initialize() {
    // Button Handlers
    registerButtonAddDefaultFeeds();
    registerButtonAddFeed();
    registerButtonRefresh();
    registerButtonStateUpload();
    registerButtonStateDownload();
    registerButtonClearState();

    displayFeed();

    // reload all feeds
    refreshFeeds();

    // Add event listeners to feed links
    addFeedClickedEvent();
}
initialize();

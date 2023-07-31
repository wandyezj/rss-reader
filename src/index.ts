import { refreshFeed } from "./State/State";
import { displayFeed } from "./UI/displayFeed";
import { refreshFeeds } from "./refreshFeeds";
import { registerButtonAddFeed } from "./registerButtonAddFeed";
import { registerButtonRefresh } from "./registerButtonRefresh";
import { registerButtonStateDownload } from "./registerButtonStateDownload";
import { registerButtonStateUpload } from "./registerButtonStateUpload";
import { website, clock } from "./website";

console.log(website());
clock();

/**
 * Initialize the application
 * register button handlers
 */
function initialize() {
    // Button Handlers
    registerButtonAddFeed();
    registerButtonRefresh();
    registerButtonStateUpload();
    registerButtonStateDownload();
    displayFeed();
    // reload all feeds
    refreshFeeds();
}

initialize();

import { displayFeed } from "./UI/displayFeed";
import { refreshFeeds } from "./refreshFeeds";
import { registerButtonAddFeed } from "./registerButtonAddFeed";
import { registerButtonRefresh } from "./registerButtonRefresh";
import { registerButtonStateDownload } from "./registerButtonStateDownload";
import { registerButtonStateUpload } from "./registerButtonStateUpload";
import { registerButtonAddDefaultFeeds } from "./registerButtonAddDefaultFeeds";
import { registerButtonClearState } from "./registerButtonClearState";

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
}

initialize();

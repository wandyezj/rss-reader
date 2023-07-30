import { registerButtonAddFeed } from "./registerButtonAddFeed";
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
    registerButtonStateUpload();
    registerButtonStateDownload();
}

initialize();

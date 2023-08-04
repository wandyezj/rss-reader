import { getState } from "./State/State";
import { getButton } from "./getButton";

export function registerButtonStateDownload() {
    const button = getButton("button-state-download");

    button.onclick = function () {
        try {
            // Get the existing feeds from localStorage
            var state = getState();

            // Generate a JSON file and download
            var json = JSON.stringify(state, null, 2);
            var blob = new Blob([json], { type: "application/json" });
            var url = URL.createObjectURL(blob);

            var link = document.createElement("a");
            link.href = url;
            link.download = "rss-reader-state.json";
            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download state", error);
        }
    };
}

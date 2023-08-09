import { getState } from "./State/State";
import { getButton } from "./getButton";

export function registerButtonStateDownload() {
    const link = document.querySelector(".download-json");
    if (link) {
        link.addEventListener("click", async function () {
            try {
                // Get the existing feeds from localStorage
                const state = getState();
                // Generate a JSON file and download
                const json = JSON.stringify(state, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "rss-reader-state.json";
                a.click();
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Failed to download state:", error);
            }
        });
    }
}

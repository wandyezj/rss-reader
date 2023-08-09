import { State, setState } from "./State/State";
import { getButton } from "./getButton";
import { refreshFeeds } from "./refreshFeeds";

export function registerButtonStateUpload() {
    const input = document.querySelector("#import-json") as HTMLInputElement;
    if (!input) return; // Check if the input element exists

    input.addEventListener("change", async () => {
        const fileInput = input;
        if (!fileInput.files) {
            console.error("No file selected for upload");
            return;
        }
        const file = fileInput.files[0];
        if (!file) {
            console.error("No file selected");
            return;
        }
        const reader = new FileReader();
        reader.onload = function () {
            try {
                // Parse the JSON file and add each feed
                const state = JSON.parse(reader.result as string);
                setState(state);
                // Reload feeds after updating the state
                refreshFeeds();
            } catch (error) {
                console.error("Failed to upload feeds", error);
            }
        };
        reader.readAsText(file);
    });
}

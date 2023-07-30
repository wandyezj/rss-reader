import { State, setState } from "./State/State";

export function registerButtonStateUpload() {
    // Upload button
    const buttonUpload = document.getElementById("button-state-upload");
    if (!buttonUpload) {
        throw new Error("Failed to find button-state-upload");
    }

    buttonUpload.onchange = function () {
        var fileInput = buttonUpload as HTMLInputElement;
        if (fileInput.files === null) {
            console.error("No file selected for upload");
            return;
        }

        var file = fileInput.files[0];
        if (!file) {
            console.error("No file selected");
            return;
        }

        var reader = new FileReader();

        reader.onload = function () {
            try {
                // Parse the JSON file and add each feed
                var state = JSON.parse(reader.result as string) as State;
                setState(state);
            } catch (error) {
                console.error("Failed to upload feeds", error);
            }
        };

        reader.readAsText(file);
    };

    // const button = document.getElementById("importButton");
    // if (button) {
    //     button.onclick = function () {
    //         buttonUpload.click();
    //     };
    // }
}

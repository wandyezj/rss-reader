// src/components/Settings/Settings.ts

import { downloadFile, uploadFile } from "../FileHandler";

export function saveSettings(settings: any): void {
    if (typeof localStorage === "undefined") {
        throw new Error("The LocalStorage API is not supported in this browser");
    }

    const settingsJson = JSON.stringify(settings);
    localStorage.setItem("rssReaderSettings", settingsJson);
}

export function loadSettings(): any {
    const settingsJson = localStorage.getItem("rssReaderSettings");
    if (settingsJson) {
        return JSON.parse(settingsJson);
    } else {
        return null;
    }
}

export async function downloadSettings(settings: any): Promise<void> {
    const settingsJson = JSON.stringify(settings);
    downloadFile(settingsJson, "settings.json", "application/json");
}

export async function uploadSettings(inputElement: HTMLInputElement): Promise<any> {
    const settingsJson = await uploadFile(inputElement);
    return JSON.parse(settingsJson);
}

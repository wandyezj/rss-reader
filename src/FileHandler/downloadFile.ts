export function downloadFile(content: string, filename: string, contentType: string): void {
    if (typeof Blob === "undefined") {
        throw new Error("The Blob API is not supported in this browser");
    }

    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

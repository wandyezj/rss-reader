export function uploadFile(inputElement: HTMLInputElement): Promise<string> {
    return new Promise((resolve, reject) => {
        if (typeof FileReader === "undefined") {
            reject("The FileReader API is not supported in this browser");
        }
        if (inputElement.files === null) {
            reject("No files available");
            return;
        }

        const file = inputElement.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result as string);
            };
            reader.onerror = function () {
                reject(reader.error);
            };
            reader.readAsText(file);
        } else {
            reject(new Error("No file selected"));
        }
    });
}

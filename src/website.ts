export function website(): string {
    return "website";
}

export function clock() {
    setInterval(() => {
        const element = document.getElementById("notinsert");
        if (element) {
            element.innerText = Date.now().toString();
        }
    }, 1000);
}

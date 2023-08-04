export function getButton(id: string): HTMLButtonElement {
    const button = document.getElementById(id);
    if (!button) {
        throw new Error(`Failed to find ${id}`);
    }
    return button as HTMLButtonElement;
}

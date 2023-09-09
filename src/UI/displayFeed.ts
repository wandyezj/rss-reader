// displayFeed.ts

import { Feed } from "../State/Feed";
import { RssItem } from "../State/RssItem";
import { getState } from "../State/State";

/**
 * Displays the current feed based on the current state
 */
export async function displayFeed(): Promise<void> {
    // Get the updated feed state
    const state = getState();

    try {
        // Update the HTML with the new feed items
        displayFeedItems(state.feeds);
    } catch (error) {
        console.error("Error updating HTML with feed items:", error);
    }
}

function displayFeedItems(feeds: Feed[]): void {
    const feedBoxContainer = document.querySelector(".feed-box-container");
    if (feedBoxContainer === null) {
        return;
    }

    const items: HTMLDivElement[] = [];

    // Add all feeds items
    feeds.forEach((feed) => {
        feed.items.forEach((item) => {
            const feedBox = createFeedItem(item);
            items.push(feedBox);
        });
    });

    // Clear existing feed items
    feedBoxContainer.innerHTML = "";

    // Append all children at once
    feedBoxContainer.append(...items);
}

function createFeedItem(item: RssItem) {
    const { image, link } = item;

    // Item Div
    // - Image Div
    // - Text Div
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("feed-box");

    // Image Div
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("feed-box-img");

    // Picture
    const imgElement = document.createElement("img");
    imgElement.src = image || "assets/default-image.jpg";
    imgElement.alt = "feed img";

    if (link) {
        const aElement = document.createElement("a");
        aElement.target = "_blank";
        aElement.href = link;
        aElement.classList.add("feed-img-link");

        const arrowIcon = document.createElement("i");
        arrowIcon.classList.add("fa-solid", "fa-arrow-up-right-from-square");

        aElement.appendChild(arrowIcon);
        imageDiv.appendChild(aElement);
    }

    imageDiv.appendChild(imgElement);
    itemDiv.appendChild(imageDiv);

    // Text Div contains
    // - Date
    // - Title
    // - Description
    const textDiv = document.createElement("div");
    textDiv.classList.add("feed-box-text");

    // Date
    const strong = document.createElement("strong");
    strong.textContent = item.pubDate ? item.pubDate.substring(0, 16) : "No date";
    textDiv.appendChild(strong);

    // Title
    const aElement = document.createElement("a");
    if (link) {
        aElement.target = "_blank";
        aElement.href = link;
    }
    aElement.textContent = item.title || "";
    textDiv.appendChild(aElement);

    // Description
    const description = document.createElement("p");
    description.textContent = makeDescriptionPretty(item.description || "No Description");
    textDiv.appendChild(description);

    itemDiv.appendChild(textDiv);
    return itemDiv;
}

function makeDescriptionPretty(description: string): string {
    const replacements: [string, string][] = [
        [`&quot;`, `"`],
        [`&apos;`, `'`],
        [`<p>`, ``],
        [`</p>`, ``],
    ];

    let newDescription = description;
    replacements.forEach(([before, after]) => {
        newDescription = newDescription.replaceAll(before, after);
    });

    return newDescription;
}

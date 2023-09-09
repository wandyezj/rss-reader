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

    const feedBox = document.createElement("div");
    feedBox.classList.add("feed-box");

    const feedBoxImg = document.createElement("div");
    feedBoxImg.classList.add("feed-box-img");

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
        feedBoxImg.appendChild(aElement);
    }

    feedBoxImg.appendChild(imgElement);
    feedBox.appendChild(feedBoxImg);

    const feedBoxText = document.createElement("div");
    feedBoxText.classList.add("feed-box-text");

    const strong = document.createElement("strong");
    strong.textContent = item.pubDate ? item.pubDate.substring(0, 16) : "No date";
    feedBoxText.appendChild(strong);

    if (link) {
        const titleLink = document.createElement("a");
        titleLink.target = "_blank";
        titleLink.href = link;
        titleLink.textContent = item.title || "";
        feedBoxText.appendChild(titleLink);
    }

    // Description
    const description = document.createElement("p");
    description.textContent = makeDescriptionPretty(item.description || "No Description");
    feedBoxText.appendChild(description);

    feedBox.appendChild(feedBoxText);
    return feedBox;
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

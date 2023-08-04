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
    if (feedBoxContainer) {
        feedBoxContainer.innerHTML = ""; // Clear existing feed items

        feeds.forEach((feed) => {
            feed.items.forEach((item) => {
                const feedBox = document.createElement("div");
                feedBox.classList.add("feed-box");

                const feedBoxImg = document.createElement("div");
                feedBoxImg.classList.add("feed-box-img");
                const img = document.createElement("img");
                img.src = item.image || "default-img.jpg";
                img.alt = "feed img";
                feedBoxImg.appendChild(img);

                const feedImgLink = document.createElement("a");
                feedImgLink.href = `single.html?title=${encodeURIComponent(item.title || "")}`;
                feedImgLink.classList.add("feed-img-link");
                const arrowIcon = document.createElement("i");
                arrowIcon.classList.add("fa-solid", "fa-arrow-up-right-from-square");
                feedImgLink.appendChild(arrowIcon);
                feedBoxImg.appendChild(feedImgLink);

                feedBox.appendChild(feedBoxImg);

                const feedBoxText = document.createElement("div");
                feedBoxText.classList.add("feed-box-text");

                const strong = document.createElement("strong");
                strong.textContent = item.pubDate ? item.pubDate.substring(0, 16) : "No date";
                feedBoxText.appendChild(strong);

                const titleLink = document.createElement("a");
                titleLink.href = `single.html?title=${encodeURIComponent(item.title || "")}`;
                titleLink.textContent = item.title || "";
                feedBoxText.appendChild(titleLink);

                const description = document.createElement("p");
                description.textContent = item.description || "No Description";
                feedBoxText.appendChild(description);

                feedBox.appendChild(feedBoxText);

                feedBoxContainer.appendChild(feedBox);
            });
        });
    }
}

export function displayExpandedArticle(title: RssItem): void {
    // Find the corresponding RssItem based on the title
    const selectedRssItem = getState()
        .feeds.flatMap((feed) => feed.items)
        .find((item) => item.title === title.title);

    if (selectedRssItem) {
        // Store the selectedRssItem data in sessionStorage
        localStorage.setItem(selectedRssItem.id, JSON.stringify(selectedRssItem));

        // Redirect to single.html
        window.location.href = `single.html?id=${selectedRssItem.id}`;
    } else {
        console.error("Selected RSS item not found.");
        // You can display a message or handle the situation differently if the item is not found.
    }
}

export function addFeedClickedEvent() {
    // Add event listener to handle click on feed links
    document.addEventListener("DOMContentLoaded", () => {
        // Add click event listeners to feed links
        const feedLinks = document.querySelectorAll(".feed-img-link, .feed-box-text a");
        feedLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent the default behavior of link clicks
                const title = link.textContent || "";
                const selectedRssItem = getState()
                    .feeds.flatMap((feed) => feed.items)
                    .find((item) => item.title === title);

                if (selectedRssItem) {
                    displayExpandedArticle(selectedRssItem);
                } else {
                    console.error("Selected RSS item not found.");
                }
            });
        });
    });
}

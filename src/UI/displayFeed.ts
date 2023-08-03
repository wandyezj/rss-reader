import { fetchAndParseRss } from "../Parser/fetchAndParseRss";
import { RssItem } from "../State/RssItem";
import { addFeed, getState } from "../State/State";
import { Feed } from "../State/Feed";

/**
 * Displays the current feed based on the current state
 */
export async function displayFeed(): Promise<void> {
    // Get the updated feed state
    const state = getState();

    try {
        // Update the HTML with the new feed items and the expanded article
        displayFeedItems(state.feeds);

        // Assume the first feed and its first item are selected by default
        if (state.feeds.length > 0) {
            const firstFeed = state.feeds[0];
            if (firstFeed.items.length > 0) {
                const firstItem = firstFeed.items[0];
                displayExpandedArticle(firstFeed, firstItem);
            }
        }
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
                img.src = item.image || "default-image.jpg";
                img.alt = "feed img";
                feedBoxImg.appendChild(img);

                const feedImgLink = document.createElement("a");
                feedImgLink.href = "#";
                feedImgLink.classList.add("feed-img-link");
                const arrowIcon = document.createElement("i");
                arrowIcon.classList.add("fa-solid", "fa-arrow-up-right-from-square");
                feedImgLink.appendChild(arrowIcon);
                feedBoxImg.appendChild(feedImgLink);

                feedBox.appendChild(feedBoxImg);

                const feedBoxText = document.createElement("div");
                feedBoxText.classList.add("feed-box-text");

                const strong = document.createElement("strong");
                strong.textContent = "Publication Date";
                feedBoxText.appendChild(strong);

                const titleLink = document.createElement("a");
                titleLink.href = "#";
                titleLink.textContent = item.title || "";
                feedBoxText.appendChild(titleLink);

                const description = document.createElement("p");
                description.textContent = "Here goes the description";
                feedBoxText.appendChild(description);

                feedBox.appendChild(feedBoxText);

                feedBoxContainer.appendChild(feedBox);

                // Add click event listener to display the selected article on click
                feedBox.addEventListener("click", () => displayExpandedArticle(feed, item));
            });
        });
    }
}

function displayExpandedArticle(feed: Feed, title: RssItem): void {
    // Find the corresponding RssItem based on the title
    const selectedRssItem = feed.items.find((item) => item.title === title.title);

    if (selectedRssItem) {
        // Store the selectedRssItem data in sessionStorage
        sessionStorage.setItem("selectedRssItem", JSON.stringify(selectedRssItem));

        // Redirect to single.html
        window.location.href = "single.html";
    }
}

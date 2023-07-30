import { fetchAndParseRss } from "./Parser/fetchAndParseRss";
import { addFeed, setActiveFeed, markItemAsViewed, getState, setState } from "./State/State";
import { State } from "./State/State.1";
import { saveSettings, loadSettings } from "./settings";
import { website, clock } from "./website";

console.log(website());
clock();

function registerButtonAddFeed() {
    document.getElementById("button-add-feed")?.addEventListener("click", async () => {
        debugger;
        try {
            // Add multiple feeds
            const feedUrls = [
                "https://feeds.npr.org/1001/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
                "https://feeds.foxnews.com/foxnews/latest",
                "https://www.cbsnews.com/latest/rss/main",
                "http://rss.cnn.com/rss/cnn_topstories.rss",
            ];
            for (const url of feedUrls) {
                await addFeed(url);
            }
        } catch (error) {
            console.error("Failed to add feed", error);
        }
    });
}

function registerButtonUpload() {
    // Upload button
    document.getElementById("upload")?.addEventListener("change", function () {
        var fileInput = this as HTMLInputElement;
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
    });
}

function registerButtonDownload() {
    document.getElementById("download")?.addEventListener("click", function () {
        try {
            // Get the existing feeds from localStorage
            var state = getState();

            // Generate a JSON file and download
            var json = JSON.stringify(state, null, 2);
            var blob = new Blob([json], { type: "application/json" });
            var url = URL.createObjectURL(blob);

            var link = document.createElement("a");
            link.href = url;
            link.download = "rss-reader-state.json";
            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download feeds", error);
        }
    });
}

/**
 * Initialize the application
 * register button handlers
 */
function initialize() {
    // Button Handlers
    registerButtonAddFeed();
    registerButtonUpload();
    registerButtonDownload();
}

initialize();

function getFeedState() {
    throw new Error("Function not implemented.");
}
// const testUrl = "test-xml/npr.xml";
// // Used for playwright testing, do not remove
// test(testUrl);

// displayFeed(testUrl);

// export async function test(testUrl: string) {
//     console.log("test");
//     debugger;

//     const items = await fetchAndParseRss(testUrl);
//     console.log(items);

//     // Map the parsed items to the format expected by addFeed and filter out any undefined values
//     const feedItems = items.map((item) => item.title).filter((title): title is string => title !== undefined);

//     // Add the feed data to the state
//     addFeed(testUrl, feedItems);

//     // Set the active feed
//     setActiveFeed(testUrl);

//     // Display the feeds
//     displayFeed();

//     localStorage.setItem("test", JSON.stringify(items));

//     return items;
// }

// //const testUrl = 'https://feeds.npr.org/1001/rss.xml';

// function test2() {
//     addFeed("https://feeds.npr.org/1001/rss.xml");
//     setActiveFeed("https://feeds.npr.org/1001/rss.xml");
//     markItemAsViewed("https://feeds.npr.org/1001/rss.xml", "Item 1");

// const currentState = getFeedState();
// console.log(currentState);

// function initialize() {
//     // Add feed button
//     document.getElementById("add-feed-button")?.addEventListener("click", async () => {
//         debugger;
//         try {
//             // Add multiple feeds
//             const feedUrls = [
//                 "https://feeds.npr.org/1001/rss.xml",
//                 "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
//                 "https://feeds.foxnews.com/foxnews/latest",
//                 "https://www.cbsnews.com/latest/rss/main",
//                 "http://rss.cnn.com/rss/cnn_topstories.rss",
//             ];
//             for (const url of feedUrls) {
//                 await addFeed(url);
//             }
//         } catch (error) {
//             console.error("Failed to add feed", error);
//         }
//     });

//     const currentState = getFeedState();
//     console.log(currentState);

//     saveSettings(currentState);
//     const loadedSettings = loadSettings();
//     console.log(loadedSettings);

// async function test2() {
//     try {
//         const items = await test("https://feeds.npr.org/1001/rss.xml");
//         // How do we call these automatically?
//         addFeed("https://feeds.npr.org/1001/rss.xml");
//         setActiveFeed("https://feeds.npr.org/1001/rss.xml");

//         markItemAsViewed("https://feeds.npr.org/1001/rss.xml", items[0]);

//         const currentState = getFeedState();
//         console.log(currentState);

//         saveSettings(currentState);
//         const loadedSettings = loadSettings();
//         console.log(loadedSettings);
//     } catch (error) {
//         console.error("Error fetching RSS items:", error);
//     }
// }
//     function getFeedState() {
//         throw new Error("Function not implemented.");
//     }

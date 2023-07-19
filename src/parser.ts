//const RSS_URL = 'https://feeds.npr.org/1001/rss.xml';

//retrieve RSS feed from specified URL, processes response, logs parsed XML
//data to console
export function fetchAndParseRSS(RSS_URL: string) {
    fetch(RSS_URL)
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => {
            const insertDiv = document.getElementById("insert");
            if (insertDiv != null) {
                const items = data.getElementsByTagName("item");
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const title = item.getElementsByTagName("title")[0].textContent;
                    const pubDate = item.getElementsByTagName("pubDate")[0].textContent;
                    const image = item.getElementsByTagName("img")[0]?.getAttribute("src");
                    const description = item.getElementsByTagName("description")[0].textContent;
                    const link = item.getElementsByTagName("link")[0].textContent;

                    const articleDiv = document.createElement("div");
                    articleDiv.innerHTML = `
              <h3>${title}</h3>
              <p>${pubDate}</p>
              <img src="${image}" alt="Article Image">
              <p>${description}</p>
              <a href="${link}">Read More</a>
            `;

                    insertDiv.appendChild(articleDiv);
                }
            }
        })
        .catch((error) => console.error(error));
}

//const RSS_URL = 'https://feeds.npr.org/1001/rss.xml';


//retrieve RSS feed from specified URL, processes response, logs parsed XML
//data to console
function fetchAndParseRSS(RSS_URL) {
    fetch(RSS_URL)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const insertDiv = document.getElementById("insert");
        insertDiv.textContent = new XMLSerializer().serializeToString(data);
      })
      .catch(error => console.error(error));
  }

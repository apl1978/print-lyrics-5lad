let print = document.getElementById("printBtn");

print.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
            target: {tabId: tab.id},

            function: printSong,
        },
        onResult);
});

function printSong() {
    const docURL = document.URL;
    const url = 'https://www.5lad.ru';
    if (docURL.indexOf(url) >= 0) {

        const itemPage = document.querySelector(".item-page");
        return itemPage.innerHTML;
    } else {
        alert('Это не сайт 5lad.ru. Печать невозможна');
    }
}

function onResult(itemPage) {
    if (!itemPage) {
        alert("Не найден блок с текстом песни");
        return;
    }

    chrome.tabs.create({"url": "page.html", active: false}, (tab) => {
        setTimeout(() => {
            chrome.tabs.sendMessage(tab.id, itemPage, (resp) => {
                chrome.tabs.update(tab.id, {active: true});
            })
        }, 500)
    });
}
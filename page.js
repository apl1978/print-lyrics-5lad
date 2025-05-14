chrome.runtime.onMessage
    .addListener(function (message, sender, sendResponse) {
        additemPageToContainer(message);
        sendResponse("OK");
    });

function additemPageToContainer(itemPage) {

    if (!itemPage || !itemPage.length) {
        return;
    }
    //console.log(itemPage[0].result);
    const resultText = itemPage[0].result;
    const container = document.querySelector(".container");
    addTextNode(container, resultText);
}

function addTextNode(container, resultText) {
    const div = document.createElement("div");
    div.className = "item-page";
    div.innerHTML = resultText;
    container.appendChild(div);

    const delItems = container.querySelectorAll(".nobarre");
    delItems.forEach(delItem => {
        delItem.remove()
    });

    const url = 'https://www.5lad.ru';
    const images = document.querySelectorAll("img");
    images.forEach(image => {
        let start = image.src.indexOf('/images/');
        image.src = url + image.src.slice(start);
    });

    const applikDiv = document.getElementById("applikdivbig");

    const tr = container.querySelector("tr");
    const td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = '<h3 className="applikchordsh3">Аппликатуры аккордов</h3><br>';
    td.appendChild(applikDiv);

    let arrClasses = [".chordstext", ".instruments", ".rightpartsong"];
    arrClasses.forEach(delClass => {
        let delItem = container.querySelector(delClass);
        delItem.remove();

    });

    td.className = "rightpartsong";
}
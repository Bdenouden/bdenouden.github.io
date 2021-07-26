window.onload = async function() {
    // ensure picture location on reload
    scrollFunction();

    // retrieve content from json
    let json = JSON.parse(await ajaxGet('/cv.json'))

    // cycle through each section (education, expercience, etc)
    for (const [section, content] of Object.entries(json)) {
        // get table which contains the data and row template
        const tableEl = document.getElementById(`${section}-table`);
        const template = document.getElementById(`${section}-template`);

        // walk through all items in the content array
        // this array contains the individual fields
        content.forEach(item => {
            var itemEl = template.content.cloneNode(true);

            // walk across all properties to check if the item is an object or array
            walkObject(itemEl, item)
            tableEl.appendChild(itemEl)
        });
    }

}

function walkObject(itemEl, item) {
    for (const [key, value] of Object.entries(item)) {
        if (typeof value == 'string') {
            insertValue(itemEl, key, value)
        } else if (key == 'extra') {
            insertExtra(itemEl, value)
        } else if (typeof value == 'object') {
            walkObject(itemEl, value)
        }
    }
}


function insertValue(itemEl, key, value) {
    // find matching classname in document and replace data
    var field = itemEl.querySelectorAll(`.${key}`);
    if (field.length > 0) {
        field[0].textContent = value;
    }
}

function insertExtra(itemEl, obj) {
    var field = itemEl.querySelectorAll(`.extra`);
    let content = "";
    if (field.length > 0) {
        for (const [key, value] of Object.entries(obj)) {
            content += `<span>${key.capitalize()}: </span><span>${value.capitalize()}</span><br>`
        }
        field[0].innerHTML = content;
    }
}

// Capitalizes first letter for strings
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.getElementById("img-me").classList.add("img-round", "mini-me");
    } else if (document.body.scrollTop < 30 || document.documentElement.scrollTop < 30) {
        document.getElementById("img-me").classList.remove("img-round", "mini-me");
    } else {

    }
}

function ajaxGet(url) {
    return new Promise(function(resolve, reject) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", url);
        xhttp.timeout = 2000; // time in milliseconds
        xhttp.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhttp.response);
            } else {
                setErrorInfo()
                reject({
                    status: this.status,
                    statusText: xhttp.statusText
                });
            }
        };
        xhttp.onerror = function() {
            setErrorInfo()
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        };
        xhttp.ontimeout = function() {
            setErrorInfo()
        }
        xhttp.send();
    });
}
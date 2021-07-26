window.onload = async function() {
    let json = JSON.parse(await ajaxGet('/cv.json'))
        // console.log(json);


    // cycle through each section (education, expercience, etc)
    for (const [section, content] of Object.entries(json)) {
        console.log(section, content)

        // get table which contains the data and row template
        const tableEl = document.getElementById(`${section}-table`);
        const template = document.getElementById(`${section}-template`);
        console.log(template)

        // walk through all items in the content array
        // this array contains the individual fields
        content.forEach(item => {
            var itemEl = template.content.cloneNode(true);

            // walk across all properties to check if the item is an object or array


            walkObject(itemEl, item)
                // for (const [key, value] of Object.entries(item)) {
                //     // console.log(typeof item['info'] == 'object')
                //     if (typeof value == 'string') {
                //         insertValue(itemEl, key, value)
                //     } else if (typeof value == 'object') {
                //         console.log("OBJECT",key,value)
                //     }
                // }



            tableEl.appendChild(itemEl)
        });
        // 
        // console.log(key, entry);
    }

}

function walkObject(itemEl, item) {
    for (const [key, value] of Object.entries(item)) {
        // console.log(typeof item['info'] == 'object')
        if (typeof value == 'string') {
            insertValue(itemEl, key, value)
        } else if (key == 'extra') {
            insertExtra(itemEl, value)
            console.log("extra spotted")
        } else if (typeof value == 'object') {
            // console.log("OBJECT", key, value)
            walkObject(itemEl, value)
        }
    }
}


function insertValue(itemEl, key, value) {
    console.log(key, value)
        // find matching classname in document and replace data
    var field = itemEl.querySelectorAll(`.${key}`);
    // console.log(typeof item.period)
    if (field.length > 0) {
        field[0].textContent = value;
        console.log(itemEl)
    }
}

function insertExtra(itemEl, obj) {
    var field = itemEl.querySelectorAll(`.extra`);
    console.log(field)
    let content="";
    if (field.length > 0) {
        for(const [key, value] of Object.entries(obj)){
            content += `<b>${key.capitalize()}: </b><span>${value.capitalize()}</span><br>`
        }


        field[0].innerHTML = content;
        console.log(field, field[0])
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}




// TODO check if page opens halfway (refresh after scrolling)
// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        document.getElementById("img-me").classList.add("img-round", "mini-me");
        document.getElementById("header").classList.add("align-left");
    } else if (document.body.scrollTop < 10 || document.documentElement.scrollTop < 10) {
        document.getElementById("img-me").classList.remove("img-round", "mini-me");
        document.getElementById("header").classList.remove("align-left");
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
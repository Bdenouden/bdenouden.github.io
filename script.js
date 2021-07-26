require(['json!cv'], function(data){
    console.log("hello there")
    const template = document.getElementById("edu-template");
})


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

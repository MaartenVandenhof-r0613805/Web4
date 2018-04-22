var commenttext =document.getElementsByClassName("commenttext");
var commentbtns = document.getElementsByClassName("comment");
var comments = document.getElementsByClassName("comments");
var names = document.getElementsByClassName("name");
var ratings = document.getElementsByClassName("rating");
var number = 0;
document.addEventListener("DOMContentLoaded", function(){
    openSocket();
    console.log("Juiste js loaded");
    addComment();
});



/////////////AddComment/////////////////

function addComment(){

    for(var i = 0; i<commentbtns.length; i++){
        commentbtns[i].addEventListener('click', function () {
            number = this.id.substr(this.id.length-1);
            send(commenttext[number-1].value + "@@@@" + names[number-1].value + "####" + ratings[number-1].value);
        })
    }
}


/////////////WebSocket/////////////////

var webSocket;

function openSocket(){
    webSocket = new WebSocket("ws://localhost:8080/comments");
    webSocket.open = function (event) {
        console.log(names)
    };
    webSocket.onmessage = function (event) {
        console.log(event.data);
        writeResponse(event.data, number);
    };
    webSocket.onclose = function (event) {
    };
    console.log("Socket opened")
}

function send(text) {
    webSocket.send(text);
}

function closeSocket() {
    webSocket.close();
}

function writeResponse(text, i) {
    var commentwrap = document.createElement('div');
    var post = document.createElement('div');
    var title = document.createElement('h3');
    var rating = document.createElement('h3');
    var seperator1 = "@@@@";
    var seperator2 = "####";
    var t = text;
    commentwrap.setAttribute("class", "commentwrap");
    post.setAttribute("class", "commentpost");
    rating.setAttribute("class", "commentRating");

    post.innerHTML = text.split(seperator1).shift();
    t = text.split(seperator1).pop();

    title.innerHTML = t.split(seperator2).shift();
    rating.innerHTML = t.split(seperator2).pop();


    commentwrap.appendChild(title);
    commentwrap.appendChild(rating);
    commentwrap.appendChild(post);

    comments[i-1].appendChild(commentwrap);
}



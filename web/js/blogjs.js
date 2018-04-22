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
            send(commenttext[number-1].value);
        })
    }
}


/////////////WebSocket/////////////////

var webSocket;

function openSocket(){
    webSocket = new WebSocket("ws://localhost:8080/comments");
    webSocket.open = function (event) {

    };
    webSocket.onmessage = function (event) {
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
    commentwrap.setAttribute("class", "commentwrap");
    post.setAttribute("class", "commentpost");
    rating.setAttribute("class", "commentRating");
    title.innerHTML = names[number-1].value;
    rating.innerHTML = ratings[number-1].value;
    post.innerHTML = text;
    commentwrap.appendChild(title);
    commentwrap.appendChild(rating);
    commentwrap.appendChild(post);
    comments[i-1].appendChild(commentwrap);
}



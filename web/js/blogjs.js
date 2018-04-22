var commenttext =document.getElementsByClassName("commenttext");
var commentbtns = document.getElementsByClassName("comment");
var comments = document.getElementsByClassName("comments");
var names = document.getElementsByClassName("name");
var ratings = document.getElementsByClassName("rating");
var number = 0;
document.addEventListener("DOMContentLoaded", function(){

    console.log("Juiste js loaded");
    addComment();
});



/////////////AddComment/////////////////

function addComment(){
    openSocket();
    for(var i = 0; i<commentbtns.length; i++){
        commentbtns[i].addEventListener('click', function () {
            number = this.id.substr(this.id.length-1);
            send(commenttext[number-1].value + "@@@@" + names[number-1].value + "####" + ratings[number-1].value + "%%%%" + number);
        })
    }
}


/////////////WebSocket/////////////////

var webSocket;

function openSocket(){
    webSocket = new WebSocket("ws://localhost:8080/comments");
    webSocket.open = function (event) {
        console.log("the socket is open");
        writeResponse("Dit is een test")
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
    var seperator3 = "%%%%";
    var actualNumber;
    var t;
    commentwrap.setAttribute("class", "commentwrap");
    post.setAttribute("class", "commentpost");
    rating.setAttribute("class", "commentRating");

    post.innerHTML = text.split(seperator1).shift();
    t = text.split(seperator1).pop();
    console.log(t.split(seperator1).pop());

    title.innerHTML = t.split(seperator2).shift();
    t = t.split(seperator2).pop();

    rating.innerHTML = t.split(seperator3).shift();
    console.log(t.split(seperator3).shift());

    actualNumber = t.split(seperator3).pop();
    console.log(actualNumber);

    commentwrap.appendChild(title);
    commentwrap.appendChild(rating);
    commentwrap.appendChild(post);

    comments[actualNumber-1].appendChild(commentwrap);
}



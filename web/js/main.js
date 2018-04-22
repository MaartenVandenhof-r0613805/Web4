var connected = "Online";
var statusText = connected;
var changeButton = document.getElementById("statusbtn");
var friendbtn = document.getElementById("addFriendbtn")
var statusdiv = document.getElementById("connected");
var xmlRequest = new XMLHttpRequest();
var currentUser = false;
var sessionId = "";
window.onload = poll;


/////////////////Buttons////////////////////

document.addEventListener("DOMContentLoaded", function(){
    getSessionId();
    statusText = connected;
    updateStatus();
    renderHTML();
    changeFriendsColor(statusdiv);
    openSocket();
});

changeButton.addEventListener("click", function () {
    var statusJava = "";
    if (document.getElementById('typeStatus').value == 'Type Status'){
        statusText = document.getElementById('dropdown').value;
        statusJava = "status=" + encodeURIComponent(statusText)

        xmlRequest.open("POST", "Controller?action=UpdateStatus", true);

        xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlRequest.send(statusJava);
        changeDropdownColor();
    } else {
        statusText = document.getElementById('typeStatus').value;
        statusJava = "status=" + encodeURIComponent(statusText)

        xmlRequest.open("POST", "Controller?action=UpdateStatus", true);

        xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlRequest.send(statusJava);
        document.getElementById('connected').style.color = "#FF8C00";
    }
    renderHTML();
    resetTypeStatus();
    updateStatus();
});

friendbtn.addEventListener("click", function () {
    addJavaFriend();
});

document.getElementById("sync").addEventListener("click", function () {
    getFriendList();
});

document.getElementById("sendMessage").addEventListener("click", function () {
    currentUser = true;
    send()
});


/////////////////Status///////////////

function addJavaFriend() {
    var email = "email=" + encodeURIComponent(document.getElementById("friendName").value)

    xmlRequest.open("POST", "Controller?action=AddFriend", true);

    xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlRequest.send(email);
}

function renderHTML(){
    statusdiv.innerHTML = "";
    statusdiv.insertAdjacentHTML('beforeend', statusText);
}

function resetTypeStatus(){
    document.getElementById('typeStatus').value = "Type Status";
}

function changeDropdownColor() {
    if(document.getElementById('dropdown').value == "Online"){
        document.getElementById('connected').style.color = "#03FF06";
    } else if(document.getElementById('dropdown').value == "Offline"){
        document.getElementById('connected').style.color = "#FF0000";
    } else {
        document.getElementById('connected').style.color = "#FF8C00";
    }
}


function updateStatus() {
    var statusUTF8 = "status=" + encodeURIComponent(statusText);

    xmlRequest.open("POST", "Controller?action=UpdateStatus", true);

    xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlRequest.send(statusUTF8);

    console.log("Functie is uitgevoerd");
}



///////////////Friendlist///////////////

function getFriendList(){
    xmlRequest.open("GET", "Controller?action=GetFriendList", true);
    xmlRequest.onreadystatechange = addFriendDiv;
    xmlRequest.send(null);
}

function addFriendDiv(){

            var serverResponse = JSON.parse(xmlRequest.responseText);
            var friends = document.getElementById("friends");

            friends.innerHTML = "";
            for (var i = 0; i < serverResponse.length; i++) {
                var tr = document.createElement('tr');
                var tdname = document.createElement('td');
                var tdstatus = document.createElement('td');
                tdstatus.setAttribute("id", "friendStatus" + i);

                tdname.innerHTML = serverResponse[i].firstName;
                tdstatus.innerHTML = serverResponse[i].status;


                console.log("FOR LOOP WORD UITGEVOERD");

                tr.appendChild(tdname);
                tr.appendChild(tdstatus);
                friends.appendChild(tr);
                changeFriendsColor(tdstatus);

            }
}

function changeFriendsColor (element) {
    if(element.innerHTML == "Online"){
        element.style.color = "#03FF06";
    } else if(element.innerHTML == "Offline"){
        element.style.color = "#FF0000";
    } else {
        element.style.color = "#FF8C00";
    }
}

function poll() {
    setTimeout(function () {
        getFriendList();
        poll();
    }, 2000);
}

/////////////////Chat///////////////

var webSocket;
var messages = document.getElementById("conversation");

function openSocket(){
    webSocket = new WebSocket("ws://localhost:8080/echo");
    webSocket.open = function (event) {
        writeResponse("Connection opened");
    };
    webSocket.onmessage = function (event) {
        if (currentUser == true){
            writeResponseUser(event.data);
        } else {
            writeResponse(event.data);
        }
    };
    webSocket.onclose = function (event) {
        writeResponse("Connection closed")
    }
}

function send() {
    var text = document.getElementById("message").value;
    webSocket.send(text);
}

function closeSocket() {
    webSocket.close();
}

function writeResponse(text) {
    var p = document.createElement('p')
    var div = document.createElement('div');
    p.innerHTML = text;
    div.appendChild(p);
    messages.appendChild(div);
    messages.style.fontSize = "20";
    currentUser = false;

}

function writeResponseUser(text) {
    var p = document.createElement('p')
    var div = document.createElement('div');
    p.innerHTML = text;
    p.setAttribute("id", "user");
    div.appendChild(p);
    messages.appendChild(div);
    messages.style.fontSize = "20";
    currentUser = false;
}

function getSessionId(){
    xmlRequest.open("GET", "Controller?action=GetSessionId", true);
    xmlRequest.onreadystatechange =getActualSession;
    xmlRequest.send(null);
}

function getActualSession(){
    var serverResponse = JSON.parse(xmlRequest.responseText);
    sessionId = serverResponse[0];
    console.log(sessionId);
}

/////////////////////ClosePage///////////////////

function closePage() {
    statusText = "Offline";
    updateStatus();
    closeSocket();
}


window.onbeforeunload = function(){
    statusText = "Offline";
    updateStatus();
    closeSocket();
    return 'Are you sure you want to leave?';
};
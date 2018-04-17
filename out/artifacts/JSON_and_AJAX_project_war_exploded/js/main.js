var connected = "Online";
var statusText = connected;
var changeButton = document.getElementById("statusbtn");
var friendbtn = document.getElementById("addFriendbtn")
var statusdiv = document.getElementById("connected");
var xmlRequest = new XMLHttpRequest();
window.onload = poll;

/////////////////

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('connected').style.color = "#03FF06";
    renderHTML();
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
    send()
})


/////////////////

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

///////////////


function updateStatus() {
    var statusUTF8 = "status=" + encodeURIComponent(statusText);

    xmlRequest.open("POST", "Controller?action=UpdateStatus", true);

    xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlRequest.send(statusUTF8);

    console.log("Functie is uitgevoerd");
}

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

/////////////////

var websocket;
var messages = document.getElementById("messages");

function openSocket(){
    alert("Start openSocket");
    websocket = new websocket("ws://localhost:8080/echo");
    alert("1");
    websocket.open = function (event) {
        writeResponse("Connection opened");
    }
    alert("2");
    websocket.onmessage = function (event) {
        writeResponse(event.data);
    }
    alert("3");
    websocket.onclose = function (event) {
        writeResponse("Connection closed")
    }
    alert("Open Done");
}

function send() {
    var text = document.getElementById("message").value;
    websocket.send(text);
    alert("Send message");
}

function closeSocket() {
    websocket.close();
}

function writeResponse(text) {
    messages.innerHTML =+ "<br/>" + text;
}
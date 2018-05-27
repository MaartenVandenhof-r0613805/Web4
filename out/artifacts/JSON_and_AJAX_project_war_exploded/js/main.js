var connected = "Online";
var statusText = connected;
var changeButton = document.getElementById("statusbtn");
var friendbtn = document.getElementById("addFriendbtn");
var statusdiv = document.getElementById("connected");
var xmlRequest = new XMLHttpRequest();
var currentUser = false;
var currentFriendId = "";
var hidden = false;

///////////////////JQuery//////////////////////

$(document).ready(function () {
    ///////////////OnStart/////////////////

    poll();
    $('#sendMessage').on('click', function () {
        console.log("Cliced SendMessage");
       sendMessage();
    });
    showHideFriendList();

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
            var tdbtn = document.createElement('td');
            var chatbtn = document.createElement('button');
            chatbtn.setAttribute("id", serverResponse[i].userId);
            chatbtn.setAttribute("class", "chatbtn");
            tdstatus.setAttribute("id", "friendStatus" + i);

            tdname.innerHTML = serverResponse[i].firstName;
            tdstatus.innerHTML = serverResponse[i].status;
            chatbtn.innerHTML = "Chat";

            tr.appendChild(tdname);
            tr.appendChild(tdstatus);
            tdbtn.appendChild(chatbtn);
            tr.appendChild(tdbtn);
            friends.appendChild(tr);
            changeFriendsColor(tdstatus);

        }
        getMessageButtons();
    }
    
    /////////////////Show/Hide Friendlist///////////////

        function showHideFriendList() {
            $('#showFriendsbtn').click(function(){
                if(hidden){
                    $("#friendsTable").show();
                    hidden = false;
                }
                else{
                    $("#friendsTable").hide();
                    hidden = true;

                }
            })
        }

    
    /////////////////Poll///////////////


    function poll() {
        setTimeout(function () {
            getFriendList();
            getMessages();
            console.log("polling");
            poll();
        }, 1000);
    }

    /////////////////Chat///////////////

    function getMessageButtons() {
        var $conversation = $('#conversation');
        $.each(document.getElementsByClassName("chatbtn"), function () {

            $(this).on('click', function(){
                currentFriendId = this.id;
                console.log("Clicked");
                $.ajax({
                    type:'GET',
                    url: 'Controller?action=GetMessages&friendId='+ currentFriendId,
                    dataType: 'json',
                    success: function (data) {
                        $conversation.html("");
                        if(data != null){
                            for (var i = 0; i<data.length;i++){
                                var p = document.createElement('p')
                                var div = document.createElement('div');
                                console.log(data[i]);
                                p.innerHTML = data[i];
                                div.appendChild(p);
                                $conversation.append(div);
                            }
                        }
                    }
                })
            });
        })


    }

    function sendMessage() {
        var message = $('#message').val();
        $.ajax({
            type: 'POST',
            url: 'Controller?action=addMessage',
            data: {
                'message' : message,
                'currentFriendId' : currentFriendId
            },
            success: function () {
                var $conversation = $('#conversation');
                $.ajax({
                    type:'GET',
                    url: 'Controller?action=GetMessages&friendId='+ currentFriendId,
                    dataType: 'json',
                    success: function (data) {
                        $conversation.html("");
                        for (var i = 0; i<data.length;i++){
                            var p = document.createElement('p');
                            var div = document.createElement('div');
                            console.log(data[i]);
                            p.innerHTML = data[i];
                            div.appendChild(p);
                            $conversation.append(div);
                        }
                    }
                })
            }
        })

    }

    function getMessages() {
        var $conversation = $('#conversation');
        $.ajax({
            type:'GET',
            url: 'Controller?action=GetMessages&friendId='+ currentFriendId,
            dataType: 'json',
            success: function (data) {
                $conversation.html("");
                if(data != null){
                    for (var i = 0; i<data.length;i++){
                        var p = document.createElement('p')
                        var div = document.createElement('div');
                        console.log(data[i]);
                        p.innerHTML = data[i];
                        div.appendChild(p);
                        $conversation.append(div);
                    }
                }
            }
        })
    }
});

/////////////////Buttons////////////////////

document.addEventListener("DOMContentLoaded", function(){
    userDisplay();
    statusText = connected;
    updateStatus();
    renderHTML();
    changeFriendsColor(statusdiv);
});

changeButton.addEventListener("click", function () {
    var statusJava = "";
    if (document.getElementById('typeStatus').value == 'Type Status'){
        statusText = document.getElementById('dropdown').value;
        statusJava = "status=" + encodeURIComponent(statusText);

        xmlRequest.open("POST", "Controller?action=UpdateStatus", true);

        xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlRequest.send(statusJava);
        changeDropdownColor();
    } else {
        statusText = document.getElementById('typeStatus').value;
        statusJava = "status=" + encodeURIComponent(statusText);

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



function changeFriendsColor (element) {
    if(element.innerHTML == "Online"){
        element.style.color = "#03FF06";
    } else if(element.innerHTML == "Offline"){
        element.style.color = "#FF0000";
    } else {
        element.style.color = "#FF8C00";
    }
}



/////////////LoginUserDisplay/////////////////

function userDisplay() {
    console.log("before navbar");
    var navbar = document.getElementsByClassName("navbar")[0];
    console.log("after navbar");
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    xmlRequest.open("GET", "Controller?action=GetSessionId", true);
    xmlRequest.onreadystatechange = function (ev) {
        var serverResponse = JSON.parse(xmlRequest.responseText);
        li1.innerHTML = "Welcome " + serverResponse.firstName;
        li2.innerHTML = "<a href=\"index.html\">Blog</a>";
        navbar.appendChild(li1);
        navbar.appendChild(li2);
    };
    xmlRequest.send(null);
}


/////////////////////ClosePage///////////////////

window.onbeforeunload = function(){
    statusText = "Offline";
    updateStatus();
    closeSocket();
    return 'Are you sure you want to leave?';
};


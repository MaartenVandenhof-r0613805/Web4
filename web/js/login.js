var xmlRequest = new XMLHttpRequest();

/////////////////////Buttons///////////////////

document.getElementById("guestbtn").addEventListener('click', function () {
    console.log("CLICKED");
});


/////////////////////LoginAsGuest///////////////////

function loginAsGuest(){
    var guest = "email=guest@ucll.be&password=t";

    xmlRequest.open("POST", "Controller?action=LogIn", true);
    console.log("LOGIN DONE");
    xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlRequest.send(guest);
}
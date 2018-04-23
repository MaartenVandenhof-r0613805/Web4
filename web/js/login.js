var xmlRequest = new XMLHttpRequest();

/////////////////////Buttons///////////////////

document.getElementById("guestbtn").addEventListener('click', function () {
    console.log("CLICKED");
    loginAsGuest();
});


/////////////////////LoginAsGuest///////////////////

function loginAsGuest(){
    var email = "email=guest@ucll.be";
    var password = "password=t";

    xmlRequest.open("POST", "Controller?action=LogIn", true);

    xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlRequest.send(email, password);
}
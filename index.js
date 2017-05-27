var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");
function submitClick(){
	var firebaseReference = firebase.database().ref();
	var messageText=mainText.value;
	firebaseReference.push().set(messageText);
}
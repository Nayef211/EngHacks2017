var mainText = document.getElementById("mainText");
var submitButton = document.getElementById("submitButton");
var firebaseReference = firebase.database().ref();
var headingReference=firebaseReference.child("Technology"); //necessary
var count=0;
var clickCount=0;
var localData;

//following can get the values of subcategories
var ratingRef = firebase.database().ref("NecessaryCategory/");
ratingRef.orderByValue().on("value", function(data) {
	localData = data;
});

//start of being able to insert into database
function submitClick(){
	clickCount++;
	if (clickCount>count){
		refresh();
		count++;
	}
}

function refresh(){
	headingReference.on('value', function(dataSnap){
		let value;
		var messageText=mainText.value; // searched keyword
		console.log(messageText);

		localData.forEach((data) => {
			if (messageText === data.key) {
				value = Number(data.val()) + 1;
				console.log('value', value);
				console.log('data.val', data.val());
			}
		});

		console.log(value);
		var updates = {};
		updates['/' + messageText] = value || 1;
		document.getElementById("mainText").value="";
		return ratingRef.update(updates);	
	});
}

if (clickCount>count){
	refresh();
	count++;
}
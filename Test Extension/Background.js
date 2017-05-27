	chrome.browserAction.onClicked.addListener(function(activetab)
	{
		var newURL = "http://imgur.com/1NmGgDU";
		chrome.tabs.create({url: newURL});
	});
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "http://i.imgur.com/1NmGgDU.jpg";
    chrome.tabs.create({ url: newURL });
});
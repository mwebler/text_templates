chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = chrome.extension.getURL('options.html');
    chrome.tabs.create({ url: newURL });
});
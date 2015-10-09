chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: 'My menu',
        id: 'menu1', // you'll use this in the handler function to identify this context menu item
        contexts: ['editable'],
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log('click');
    if (info.menuItemId === "menu1") { // here's where you'll need the ID
        // do something
    console.log("meu menu");
        chrome.tabs.sendMessage(tab.id,
          {
            text:	"testo texte", 
            html:	"false"
          }
        );
    }
});

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = chrome.extension.getURL('options.html');
    chrome.tabs.create({ url: newURL });
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	
	var found = false;
	var focusEl = window.top.document;
	var failSafe = 0;
	var parent = window;
	console.log(request);
	var text	= request.text;
	var html	= request.html;
	
	console.log('request');
	
	var elem = document.activeElement;
  // Assume: elem is an input or textarea element.
var YOURSTRING = 'whatever';
var start = elem.selectionStart;
var end = elem.selectionEnd;
elem.value = elem.value.slice(0, start) + YOURSTRING + elem.value.substr(end);
// Set cursor after selected text
elem.selectionStart = start + YOURSTRING.length;
elem.selectionEnd = elem.selectionStart;
	
});
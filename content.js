console.log("oi");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("call");
	var found = false;
	var focusEl = window.top.document;
	var failSafe = 0;
	var parent = window;
	console.log(request);
	var text	= request.text;
	var html	= request.html;
	
	while (false === found) {
		
		// has an active element so need to keep searching, ie in a frame
		if (focusEl.activeElement) {
			
			// set next focusEl
			focusEl = focusEl.activeElement;
			
			if (focusEl instanceof HTMLIFrameElement) {
				
				parent = focusEl.contentDocument;
				focusEl = focusEl.contentDocument;
				
			}
			
			// found iframe in design mode
			if (focusEl.designMode == 'on' || focusEl.contentEditable) {
				
				// no need to carry on
				found = true;
				
			}
			
		}
		// no more active elements so we can stop
		else {
			
			found = true;
			
		}
		
		failSafe++;
		
		// failsafe in case something went wrong to prevent infinite loop
		if (failSafe > 100) {
			found = true;
			alert('Sorry, couldn\'t find target to insert text into.');
			return false;
		}
		
	}
	
	// design mode editor
	if (focusEl.designMode == 'on') {
		console.log('designmode');
		
		if (!html) {
			// replace line breaks with <br/> tags
			text = text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2');
		}
		
		// insert
		focusEl.execCommand('insertHtml', false, text);
		
	}
	// input, textarea
	else if (
		focusEl.tagName.toLowerCase() == 'input'
		|| focusEl.tagName.toLowerCase() == 'textarea'
	)
	{
		console.log('input');
		// get start and end position of caret
		var startPos	= focusEl.selectionStart;
		var endPos		= focusEl.selectionEnd;

		// insert text
		focusEl.value = focusEl.value.substring(0, startPos)
							+ text
							+ focusEl.value.substring(endPos, focusEl.value.length);

		// update caret position
		focusEl.setSelectionRange(startPos + text.length, startPos + text.length);
		
	}
	// if content editable
	else if (focusEl.contentEditable) {
		console.log('contentEditable');
		// get selection
		var selection	= parent.getSelection();
		var range		= selection.getRangeAt(0);
		
		range.deleteContents();
		
		// get text
		if (html) {
			var div			= document.createElement('div');
			div.innerHTML	= text;
			range.insertNode(div);
		}
		else {
			var text = text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2');
			var texts = text.split('<br/>');
		
			// insert
			for (var i=texts.length-1; i>=0; i--) {
				range.insertNode(document.createTextNode(texts[i]));
				if (i > 0) {
					range.insertNode(document.createElement('br'));
				}
			}
		}
		range.collapse(true);
		range.detach();
		
	}
	
	return true;
	
});

function createButton(){
  
}
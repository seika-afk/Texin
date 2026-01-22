

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
//##################################### EVERYTHING RELATED TO GETTING OR ADDING NEW TEXT
	if (request.action == "addText") {
        
	    chrome.storage.local.get(['savedTexts'], (result) => {
            
		    let savedTexts = result.savedTexts || [];
            		savedTexts.push({
                		text: request.text,
                		position: request.position,
                		id: savedTexts.length
            		});
            chrome.storage.local.set({savedTexts: savedTexts}, () => {
                //console.log("Pin saved ::: ", request.text.slice(0, 30));
                sendResponse({success: true});
            });
        });
        return true;
    }
    
    if (request.action == "getTexts") {
        chrome.storage.local.get(['savedTexts'], (result) => {
            sendResponse({texts: result.savedTexts || []});
        });
        return true;
    }
//############################################### INSTRUCTING TO SCROLL
    if (request.action == "scroll") {
        chrome.storage.local.get(['savedTexts'], (result) => {
            const savedTexts = result.savedTexts || [];
            const item = savedTexts[request.id];
            
            if (item) {
                

		    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    
			    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "scrollTo",
                        position: item.position
                    });
                });
            }
        });
        sendResponse({success: true});
        return true;
    }
    
//##################### PERFORMING DELETION
    if (request.action == "delete") {
        chrome.storage.local.get(['savedTexts'], (result) => {
            let savedTexts = result.savedTexts || [];
            savedTexts = savedTexts.filter((item, index) => index !== parseInt(request.id));
            
            chrome.storage.local.set({savedTexts: savedTexts}, () => {
                //console.log("Item deleted from storage");
                sendResponse({success: true});
            });
        });
        return true;
    }
});

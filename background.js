let savedTexts= [];



chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
if (request.action=="addText"){
	savedTexts.push({
	text:request.text,
	position: request.position,
	id:savedTexts.length


	})

chrome.storage.local.set({savedTexts:savedTexts},()=>{

console.log("Pin saved ::: ",request.text.slice(0,30));
sendResponse({success:true});
})
return true;
}
if(request.action=="getTexts"){
chrome.storage.local.get(['savedTexts'],(result)=>{

sendResponse({texts:result.savedTexts || [] });


});
return true

}


if (request.action=="scroll"){
//send message to contentScript with the id 
chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
chrome.tabs.sendMessage(tabs[0].id,{
	action:"scrollTo",
	id:request.id


})

})
sendResponse({success:true});
return true

}





})



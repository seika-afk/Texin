let savedTexts = [];

setTimeout(()=>{

const promo= document.querySelector(".heading").addEventListener("click",()=>{

window.open("https://google.com")
})


 const compContainer = document.querySelector(".comp-container");

//delete button

	const del= 

compContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("comp")) {
            //alert("Clicked: " + e.target.id);
        //ask to scroll to this index's value
	chrome.runtime.sendMessage({action:"scroll",id:e.target.id})


	}
    });
}, 100);
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: "getTexts" }, (response) => {
        if (response && response.texts) {
            savedTexts = response.texts;
            const compContainer = document.querySelector(".comp-container");
            
            savedTexts.forEach((item, index) => {
		let child = document.createElement("div");
    		child.className = "comp";
    		child.id = index;
    		child.style.display = "flex";
    		child.style.justifyContent = "space-between";
    		child.style.alignItems = "center";
    		child.style.padding = "10px";
    
    			let textSpan = document.createElement("span");
    			textSpan.textContent = item.text.slice(0, 30);
    
    			let del_button = document.createElement("span");
    			del_button.className = "del_";
    			del_button.textContent = "🗑";
    			del_button.style.cursor = "pointer";
    			del_button.addEventListener("click", (e) => {
        			e.stopPropagation();
    			});
    
    		child.appendChild(textSpan);
    		child.appendChild(del_button);
    		compContainer.appendChild(child);	
	    });
        }
    });


	


});



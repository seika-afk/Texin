let savedTexts = [];


//on content loading do :
//- set promo for donating or funds 
//- send message to get text and render those
//
document.addEventListener('DOMContentLoaded', () => {
    const promo = document.querySelector(".heading");
    if (promo) {
        promo.addEventListener("click", () => {
            window.open("https://texin.vercel.app/donate.html");
        });
    }
    
  	  const compContainer = document.querySelector(".comp-container");
    
    chrome.runtime.sendMessage({ action: "getTexts" }, (response) => {
        if (response && response.texts) {
            savedTexts = response.texts;
            
            savedTexts.forEach((item, index) => {
                let child = document.createElement("div");
                child.className = "comp";
                child.id = index;
                child.style.display = "flex";
                child.style.justifyContent = "space-between";
                child.style.alignItems = "center";
                child.style.padding = "10px";
                child.style.marginBottom = "5px";
                child.style.cursor = "pointer";
                child.style.borderRadius = "10px";
                
                	let textSpan = document.createElement("span");
                	textSpan.textContent = item.text.slice(0, 30);
                
                	let del_button = document.createElement("span");
                	del_button.className = "del_";
                	del_button.textContent = "🗑";
                	del_button.style.cursor = "pointer";
                
                		del_button.addEventListener("click", (e) => {
                	    e.stopPropagation();
                    
                    		chrome.runtime.sendMessage({
                        		action: "delete",
                        	id: index
                    		}, (response) => {
                    		    if (response && response.success) {
                            	child.remove();
                        			}
                    		});
                });
                
                child.appendChild(textSpan);
                child.appendChild(del_button);
                compContainer.appendChild(child);
            });
        }
    });
    
    
    compContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("comp") || e.target.parentElement.classList.contains("comp")) {
            const comp = e.target.classList.contains("comp") ? e.target : e.target.parentElement;
            chrome.runtime.sendMessage({action: "scroll", id: comp.id});
        }
    });
});

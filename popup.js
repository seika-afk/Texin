let savedTexts = [];

document.addEventListener('DOMContentLoaded', () => {
    
    chrome.runtime.sendMessage({ action: "getTexts" }, (response) => {
        if (response && response.texts) {
            savedTexts = response.texts;
            const compContainer = document.querySelector(".comp-container");
            
            savedTexts.forEach((item, index) => {
                let child = document.createElement("div");
                child.className = "comp";
                child.textContent = item.text.slice(0, 30);
                child.id = index;
                compContainer.appendChild(child);
            });
        }
    });
});




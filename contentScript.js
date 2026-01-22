window.addEventListener('load',()=>{
chrome.storage.local.clear(()=>{
//console.log("storage cleared")
})
})

let x = 0;

function scroll(position) {
    	const container = document.querySelector('[class*="scrollbar-gutter"]');
    if (container) {
       	 container.scrollTop = position;
        	//console.log("Scrolled to:", position);
    		
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrollTo") {
        scroll(request.position);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key == "q") {
        const selection = window.getSelection();
        const text = selection.toString();
        if (text.length > 0) {
            const container = document.querySelector('[class*="scrollbar-gutter"]');
            

		if (container) {
                	x = container.scrollTop;
                	//console.log("saved text ::: ", text);
                	chrome.runtime.sendMessage({
                    	action: "addText",
                    	text: text,
                    	position: x
                }, (response) => {
                    //console.log("sent msg to js");
                });
                toast("Saved pin!");
            }
        }
    }
    
    if (e.ctrlKey && e.altKey && e.key == "a") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        scroll(x);
    }
});

function toast(msg) {
    const el = document.createElement("div");
    el.textContent = msg;
    el.style.all = "initial";
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.left = "50%";
    el.style.transform = "translateX(-50%)";
    el.style.background = "#111";
    el.style.color = "#fff";
    el.style.padding = "15px 20px";
    el.style.borderRadius = "6px";
    el.style.zIndex = "2147483647";
    el.style.fontFamily = "sans-serif";
    document.documentElement.appendChild(el);
    setTimeout(() => el.remove(), 1500);
}

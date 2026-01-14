document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.altKey && e.key=="q"){
    const selection = window.getSelection();
    const text = selection.toString();

    if (text.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const absoluteTop = rect.top + window.scrollY;

      console.log("Selected Text:", text);
      console.log("Scroll To Y:", absoluteTop);

	chrome.storage.local.set({
		"saved_pin":{
		text_:text,
		scrolly_:absoluteTop-250,
		}

	},()=>{console.log("saved")});
      toast(`Saved Pin : ${text.substring(0,15)}...`);

    }
else{
console.log("no content selected")
}
}
}
)
document.addEventListener("keydown",(e)=>{
if(e.ctrlKey && e.altKey && e.key=="a"){

chrome.storage.local.get(["saved_pin"],(res)=>{

if(res.saved_pin){
	window.scrollTo({
		top:res.saved_pin.scrolly_,
		behavior:'smooth'

	});
	toast("Scrolled to Pin");
}



})
}

})





function toast(msg) {
  const el = document.createElement("div");
  el.textContent = msg;

  el.style.all = "initial";
  el.style.position = "fixed";
  el.style.top = "20px";
  el.style.left = "50%";
  el.style.transform="translateX(-50%)";
  el.style.background = "#111";
  el.style.color = "#fff";
  el.style.padding = "15px 20px";
  el.style.borderRadius = "6px";
  el.style.zIndex = "2147483647";
  el.style.fontFamily = "sans-serif";

  document.documentElement.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

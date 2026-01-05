document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.altKey && e.key=="q"){

if(window.getSelection){
text=window.getSelection().toString()
console.log(text);
toast("selected")
}
else{
console.log("no content selected")
}}


})
function toast(msg) {
  const el = document.createElement("div");
  el.textContent = msg;

  el.style.all = "initial";
  el.style.position = "fixed";
  el.style.top = "20px";
  el.style.right = "200px";
  el.style.background = "#111";
  el.style.color = "#fff";
  el.style.padding = "8px 12px";
  el.style.borderRadius = "6px";
  el.style.zIndex = "2147483647";
  el.style.fontFamily = "sans-serif";

  document.documentElement.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}


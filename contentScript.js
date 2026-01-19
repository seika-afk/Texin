document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.altKey && e.key=="q"){
    const selection = window.getSelection();
    const text = selection.toString();

    if (text.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const absoluteTop = rect.top + window.scrollY;
      const absoluteLeft = rect.left + window.scrollX;

      console.log("Selected Text:", text);
      console.log("Scroll To Y:", absoluteTop);
      console.log("Scroll To X:", absoluteLeft);

      toast(`Saved position: ${Math.round(absoluteTop)}px`);}
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
  el.style.left = "50%";
  el.style.transform="translateX(50%)";
  el.style.background = "#111";
  el.style.color = "#fff";
  el.style.padding = "15px 20px";
  el.style.borderRadius = "6px";
  el.style.zIndex = "2147483647";
  el.style.fontFamily = "sans-serif";

  document.documentElement.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}


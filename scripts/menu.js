//Scripts for popout menu interaction

window.onclick = (function(elem){
  console.log("function");
  var tabName = elem.target.id;
  if(tabName == "burger"){
    setTimout(elem.style.left = 100 + "px", 300);
    console.log(elem.style);
  }
})();

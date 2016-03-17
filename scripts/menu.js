//Scripts for popout menu interaction

window.onclick = function(elem){
  var tabName = elem.target.id;
  if(tabName == "burger"){
    elem.style.left = 100 + "px";
  }
}

//Scripts for popout menu interaction

window.onclick = function(elem){
  var tabName = elem.target.id;
  if(tabName == "burger"){
    setTimout(elem.style.left = 100 + "px", 300);
    
  }
}

//Scripts for popout menu interaction

window.onclick = function(elem){
if(elem.target.id == "burger" || elem.target.id =="BURGER"){
		animate(document.getElementById("Menu"),"left","px",-200,10,100);
		animate(document.getElementById("tab"),"left","px",0,210,100);
		elem.target.id = "closeburger";
	}
	else if(elem.target.id == "closetab" || elem.target.id =="closeBURGER"){
		animate(document.getElementById("Menu"),"left","px",10,-200,100);
		animate(document.getElementById("closetab"),"left","px",210,0,100);
		elem.target.id = "burger";
	}
}

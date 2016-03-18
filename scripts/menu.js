//Scripts for popout menu interaction

function animate(elem,style,unit,from,to,time) {
    if(!elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem.style[style] = (from+step*(to-from))+unit;
            if( step == 1) clearInterval(timer);
        },25);
    elem.style[style] = from+unit;
}

window.onclick = function(elem){
if(elem.target.id == "burger"){
		animate(document.getElementById("Menu"),"left","px",-200,10,100);
		animate(document.getElementById("tab"),"left","px",0,210,100);
		elem.target.id = "closeburger";
	}
	else if(elem.target.id == "closeburger"){
		animate(document.getElementById("Menu"),"left","px",10,-200,100);
		animate(document.getElementById("closetab"),"left","px",210,0,100);
		elem.target.id = "burger";
	}
}

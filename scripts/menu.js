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
		animate(document.getElementById("burger"),"top","px",0,100,100);
		elem.target.id = "closeburger";
	}
	else if(elem.target.id == "closeburger"){
		animate(document.getElementById("closeburger"),"top","px",100,0,100);
		elem.target.id = "burger";
	}
}

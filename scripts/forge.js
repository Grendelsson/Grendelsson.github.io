// Basic animation scripts for forging game basis

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Inside rectangle
function intersects(x, y, clickX, clickY, width, height, canvasLeft, canvasTop, border) {
    var dx = x+border-canvasLeft+width-clickX;
    var dy = y+border-canvasTop+height-clickY;
    return dx <= width && (dx >= 0 && (dy <= height && dy >= 0));
}

function drawRectangle(myRectangle, context) {
  context.beginPath();
  context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
  context.fillStyle = '#fff08e';
  context.fill();
  context.lineWidth = myRectangle.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();
}

//  Stretch function for 'drawing out'

function stretch(myRectangle, canvas, context, startTime) {
  // update
  var time = (new Date()).getTime() - startTime;
  var linearSpeed = 10;
  // pixels / second
  var newX = linearSpeed * time / 1000;

  if ((newX < canvas.width - myRectangle.width - 50 - (myRectangle.borderWidth / 2)) && (time < 500)) {
    myRectangle.width += newX;
  }
  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawRectangle(myRectangle, context);

  // request new frame
  requestAnimFrame(function() {
    stretch(myRectangle, canvas, context, startTime);
  });
}

//  Area based stretch
function stretch2(myRectangle, canvas, context, startTime) {
  // update
  var time = (new Date()).getTime() - startTime;
  var linearSpeed = 10;
  // pixels / second
  var newX = linearSpeed * time / 1000;
  var rectArea = myRectangle.width * myRectangle.height;

  if ((newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) && (time < 500)) {
    myRectangle.width += newX;
    myRectangle.height = rectArea / myRectangle.width;
  }
  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawRectangle(myRectangle, context);

  // request new frame
  requestAnimFrame(function() {
    stretch2(myRectangle, canvas, context, startTime);
  });
}

//  Possibly useful
function animate(myRectangle, canvas, context, startTime) {
  // update
  var time = (new Date()).getTime() - startTime;

  var linearSpeed = 100;
  // pixels / second
  var newX = linearSpeed * time / 1000;

  if (newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
    myRectangle.x = newX;
  }

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawRectangle(myRectangle, context);

  // request new frame
  requestAnimFrame(function() {
    animate(myRectangle, canvas, context, startTime);
  });
}


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var myRectangle = {
  x: 50,
  y: 75,
  width: 100,
  height: 50,
  borderWidth: 5
};

drawRectangle(myRectangle, context);

// Draw out rectangle
document.getElementById("myCanvas").onclick = function(e) {
  // debugging alert
// alert("clickX: " + e.pageX + " clickY: "  + e.pageY + "\nx: " +  myRectangle.x + " width: " + myRectangle.width + "\ny: " +  myRectangle.y + " height: " + myRectangle.height + "\ndx: " + (myRectangle.x+myRectangle.width-e.pageX) + "\ndy: " + (myRectangle.y+myRectangle.height-e.pageY));
if(intersects(myRectangle.x, myRectangle.y, e.x, e.y, myRectangle.width, myRectangle.height, canvas.getBoundingClientRect().left, canvas.getBoundingClientRect().top, myRectangle.borderWidth)){
  var startTime = (new Date()).getTime();
  stretch2(myRectangle, canvas, context, startTime);
  }
}

//Test d3 use
//build frame
var svgWidth = 500;  
var svgHeight = 300;

var svg = d3.select('svg')  
    .attr("width", svgWidth)  
    .attr("height", svgHeight)  
    .attr("class", "bar-chart");

//build chart
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var labels = ["a","b","c","d","e","f","g","h","i"]

var barPadding = 5;  
var barWidth = (svgWidth / dataset.length);

var barChart = svg.selectAll("rect")  
    .data(dataset)  
    .enter()  
    .append("rect")  
    .attr("y", function(d) {  
        return svgHeight - d  
    })  
    .attr("height", function(d) {  
        return d;  
    })  
    .attr("width", barWidth - barPadding)  
    .attr("transform", function (d, i) {  
         var translate = [barWidth * i + barPadding/2, 0];  
         return "translate("+ translate +")";  
    })

    .append("text")
    .text(function(d,i){
         return labels[i];
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "red");
//

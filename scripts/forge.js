// Basic animation scripts for forging game basis

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function drawRectangle(myRectangle, context) {
  context.beginPath();
  context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
  context.fillStyle = '#8ED6FF';
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

  if ((newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) && (time < 500)) {
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
  x: 0,
  y: 75,
  width: 100,
  height: 50,
  borderWidth: 5
};

drawRectangle(myRectangle, context);

// Draw out on click
document.getElementById("myCanvas").onclick = function() {
  var startTime = (new Date()).getTime();
  stretch(myRectangle, canvas, context, startTime);
}
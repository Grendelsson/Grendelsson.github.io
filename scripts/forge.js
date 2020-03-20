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
var spiderData = [
  {
    className: 'germany', // optional, can be used for styling
    axes: [
      {axis: "strength", value: 13, yOffset: 10},
      {axis: "intelligence", value: 6},
      {axis: "charisma", value: 5},  
      {axis: "dexterity", value: 9},  
      {axis: "luck", value: 2, xOffset: -20}
    ]
  },
  {
    className: 'argentina',
    axes: [
      {axis: "strength", value: 6},
      {axis: "intelligence", value: 7},
      {axis: "charisma", value: 10},  
      {axis: "dexterity", value: 13},  
      {axis: "luck", value: 9}
    ]
  }
];
//API
var chart = RadarChart.chart();
var svg = d3.select('body').append('svg')
  .attr('width', 600)
  .attr('height', 800);

// draw one
svg.append('g').classed('focus', 1).datum(data).call(chart);

// draw many radars
var game = svg.selectAll('g.game').data(
  [
    data,
    data,
    data,
    data
  ]
);
game.enter().append('g').classed('game', 1);
game
  .attr('transform', function(d, i) { return 'translate(150,600)'; })
  .call(chart);

// retrieve config
chart.config();
// all options with default values
chart.config({
  containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
  w: 600,
  h: 600,
  factor: 0.95,
  factorLegend: 1,
  levels: 3,
  maxValue: 0,
  minValue: 0,
  radians: 2 * Math.PI,
  color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
  axisLine: true,
  axisText: true,
  circles: true,
  radius: 5,
  open: false,  // whether or not the last axis value should connect back to the first axis value
                // if true, consider modifying the chart opacity (see "Style with CSS" section above)
  axisJoin: function(d, i) {
    return d.className || i;
  },
  tooltipFormatValue: function(d) {
    return d;
  },
  tooltipFormatClass: function(d) {
    return d;
  },
  transitionDuration: 300
});

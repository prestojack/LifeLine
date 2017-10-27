var canvasWidth = 960;
var canvasHeight = 500;
var cubeArray = [];
var numCubesX = 19;
var numCubesY = 19;

var planeWd = 300;
var planeHt = 0;

function setup () {
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);

  // position each element on the page
  main_canvas.parent('canvasContainer');
  for (var i = -numCubesX; i <= numCubesX; i++) {
  	for (var j = -numCubesY; j <= numCubesY; j++) {
  		var testCube;
	  	testCube = new cubeSection(i*16,j*16,5,5,color(0,50,200),color(20,255,100),color(200,255,100), i, j);
	  	append(cubeArray, testCube);
	}
  }
  rectMode(CENTER);
}

function draw () {
  background(color(245,240,240));
  push();
  	translate(canvasWidth/2.0, canvasHeight/2.0);
	  rotate(-PI/2800.0*frameCount);
	  scale(1-(frameCount*0.001));
	  push();
			  
			  beginShape();
			  noStroke();
			  fill(cubeArray[0].darkCol);
			  rect(0,0,300,300);
			  endShape(CLOSE)
	  pop();
	  for (var i = 0; i < cubeArray.length; i++) {
	  	push();
	  	rotate(cubeArray[i].v2 * PI/9000.0*frameCount*map(mouseX,0,width,0,5));
	  	cubeArray[i].drawCube();
	  	pop();
	  }
	  
		  

  pop();
}

function cubeSection (xpos, ypos, widt, hght, col1, col2, col3, val1, val2) {
	this.wd = widt;
	this.ht = hght;
	this.x = xpos;
	this.y = ypos;
	this.v1 = val1;
	this.v2 = val2;
	this.darkCol = col1;
	this.midCol = col2;
	this.lightCol = col3;
	
	this.drawCube = function() {
		var fillCol = lerpColor(this.lightCol, this.midCol, map(abs(this.v1*this.v2), 0,41,0,1));
		push();
		noStroke();
		translate(this.x, this.y);
		rotate(this.v1*this.v2*PI/1800.0*frameCount)
		scale(1+(frameCount*0.0005));
		fill(fillCol);
		rect(0,0,this.wd,this.ht);
		pop();
	}
}

function mousePressed() {
	var newCol1 = color(random(160), random(160), random(160))
	var newCol2 = color(random(50,200), random(50,200), random(50,200))
	var newCol3 = color(random(170,255), random(170,255), random(170,255))
	for (var i = 0; i < cubeArray.length; i++) {
	  cubeArray[i].darkCol = newCol1;
	  cubeArray[i].midCol = newCol2;
	  cubeArray[i].lightCol = newCol3;
	}
}
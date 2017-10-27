var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var transMax = 0;
var parts = [];
var eventBoxes = [];
var traverseX = 0;
var traverseY = 0;
var targetX = 0;
var targetY = 0;
var curIndex = 0;
var targetIndex = 1;

function setup() { 
  main_canvas = createCanvas(window.innerWidth, window.innerHeight);
  main_canvas.parent('canvasContainer');
  
  ellipseMode(CENTER);
  rectMode(CENTER);

  createEvents();
  
  targetX = eventBoxes[0].x - width/2.0;
  targetY = eventBoxes[0].y - height/2.0;
  
} 

function createEvents() {
  var numEvents = Math.floor(random(2,12));
  for (var i = 0; i < numEvents; i++) {
    append(eventBoxes, new LifeEventBox(random(0,300), random(-width*2,width*2), random(-height*2,height*2), "10/12/1998", "Born"));
  }
}

function changeCanvas() {
	main_canvas = createCanvas(window.innerWidth, window.innerHeight);
}

function draw() { 
	
  background(48,40,40);
	
  fill(255);
  text(eventBoxes.length, width-40,20);
  
  translate(random(-transMax, transMax), random(-transMax, transMax));
  transMax*= 0.94;
  
  ellipse(width/2.0, height/2.0, 9,9);
  
  translate(traverseX, traverseY);
  
  for (var j = 0; j < parts.length; j++) {
    parts[j].display();
    parts[j].update();
  }
  
  push();
  beginShape();
	
  noFill();
  stroke(255);

  vertex(eventBoxes[curIndex].x- (traverseX*2), eventBoxes[curIndex].y- (traverseY*2));
  vertex((width/2.0)-traverseX, (height/2.0)-traverseY);
  vertex(eventBoxes[targetIndex].x- (traverseX*2), eventBoxes[targetIndex].y- (traverseY*2));
  
  endShape();
  pop();
  
  for (var i = 0; i < eventBoxes.length; i++) {
    
    eventBoxes[i].update();
    
    if (i < eventBoxes.length - 1) {
      push();
      translate(-traverseX*2, -traverseY*2);
      stroke(255);
      //line(eventBoxes[i].x, eventBoxes[i].y, eventBoxes[i+1].x, eventBoxes[i+1].y);
      pop();
    }
    
    if (eventBoxes[i].hovered) {
      eventBoxes[i].sz = eventBoxes[i].initSz + 12;
    }
    
    eventBoxes[i].display();
    
  }
  
  traverseX += (targetX - traverseX)/18.0;
  traverseY += (targetY - traverseY)/18.0;
}

function mousePressed() {
  for (var i = 0; i < eventBoxes.length; i++) {
    if (eventBoxes[i].hovered) {
		curIndex = (curIndex+1)%(eventBoxes.length);
		if (curIndex != 0) {
			targetIndex = curIndex - 1;
		} else {
			targetIndex = eventBoxes.length-1;
		}
      targetX = eventBoxes[(i+1)%(eventBoxes.length)].x - width/2.0;
      targetY = eventBoxes[(i+1)%(eventBoxes.length)].y - height/2.0;
      transMax = 6;
      // for (var h = 0; h < 25; h++) {
//         //append(parts, new Particle(ex, ey, random(5,13), random(2,13), color(255,213,12)));
//         append(parts, new Particle(eventBoxes[(i+1)%(eventBoxes.length)].x, eventBoxes[(i+1)%(eventBoxes.length)].y, random(5,transMax*2), random(2,transMax*2), color(225,153,0)));
//       }
    }
  }
}

function LifeEventBox (numLikes, xpos, ypos, datetime, description) {
  this.sz = map(min(numLikes,200), 0, 200, 30, 200);
  this.initSz = this.sz;
  this.x = xpos;
  this.y = ypos;
  this.creation = datetime;
  this.desc = description;
  this.hovered = false;
  this.ang = 0;
  this.ang2 = 0;
  this.sc = 1;
  
  this.display = function() {
    
    push();
    
    translate(this.x, this.y);
    
    noStroke();
    
    if (this.hovered) {
      fill(225,173,12);
    } else {
    	fill(112,201,255);
    }
    
    translate(-traverseX*2, -traverseY*2);
	push();
    rotate(this.ang);
	scale(this.sc);
    rect(0,0, this.sz, this.sz,5);
	pop();
    fill(255);
	textAlign(CENTER, TOP);
	textSize(30);
	text(this.desc, 0, (this.sz/2.0) + 5);
	text(this.creation, 0, (this.sz/2.0) + 45);
    pop();
  }
  
  this.update = function() {
    if (this.interact()) {
		if (!this.hovered) {
      	  this.hovered = true;
	      for (var h = 0; h < 25; h++) {
	        //append(parts, new Particle(ex, ey, random(5,13), random(2,13), color(255,213,12)));
	        append(parts, new Particle(this.x, this.y, random(5,16), random(2,16), color(225,153,0)));
	      }
  		}
    } else {
      this.hovered = false;
    }
    if (this.sz > this.initSz) {
      this.sz *= 0.98;
    }
	// if (this.hovered){
// 		this.ang += map(abs(sin(this.ang2)),0,1,0.01,PI/25.0);
// 		this.sc = 1 + -3*abs(sin(this.ang/10.0)/4.0);
// 		this.ang2 += PI/400.0;
// 	} else {
// 		this.ang = 0;
// 		this.ang2 = 0;
// 		this.sc = 1;
// 	}
  }
  
  this.interact = function() {
    if(mouseX > this.x - (traverseX) - (this.sz/2.0) && mouseX < this.x - (traverseX) + (this.sz/2.0) && 
      mouseY > this.y - (traverseY) - (this.sz/2.0) && mouseY < this.y - (traverseY) + (this.sz/2.0)) {
      return true;
    } else {
      return false;
    }
  }
}

function Particle(xpos, ypos, maxVel, radius, col) {
  this.x = xpos;
  this.y = ypos;
  this.rad = radius;
  this.mxV = maxVel;
  this.fillCol = col;
  this.vel = createVector(random(-this.mxV, this.mxV), random(-this.mxV, this.mxV));
  this.ang = random(0, TWO_PI);
  this.angVel = random(-PI/20.0, PI/20.0);
  this.rCheck = random(1);
  this.fbImg = loadImage("facebookThumb.png");
  
  this.display = function() {
    if(this.vel.mag() > 1.3) {
      push();
      translate(this.x, this.y);
	  translate(-traverseX*2,-traverseY*2);
	  rotate(this.ang);
      if (this.rCheck > 0.2) {
        noStroke();
        fill(this.fillCol);
      } else {
        noFill();
        stroke(this.fillCol);
        strokeWeight(2);
      }
      ellipse(0,0,this.rad,this.rad);
	  image(this.fbImg, 0, 0, this.rad, this.rad);
      pop();
    }
  }
  
  this.update = function() {
    this.x += this.vel.x;
    this.y += this.vel.y;
	this.ang += this.angVel;
    this.vel.mult(0.98);
  }
}
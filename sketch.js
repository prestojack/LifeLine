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

function draw() { 
	
  background(48,40,40);
	
  fill(255);
  text(eventBoxes.length, width-40,20);
  
  translate(traverseX, traverseY);
  
  translate(random(-transMax, transMax), random(-transMax, transMax));
  transMax*= 0.94;
  
  for (var j = 0; j < parts.length; j++) {
    parts[j].display();
    parts[j].update();
  }
  
  for (var i = 0; i < eventBoxes.length; i++) {
    
    eventBoxes[i].update();
    
    if (i < eventBoxes.length - 1) {
      push();
      translate(-traverseX*2, -traverseY*2);
      stroke(255);
      line(eventBoxes[i].x, eventBoxes[i].y, eventBoxes[i+1].x, eventBoxes[i+1].y);
      pop();
    }
    
    if(eventBoxes[i].hovered) {
      eventBoxes[i].sz = eventBoxes[i].initSz + 12;
    }
    
    eventBoxes[i].display();
    
  }
  
  traverseX += (targetX - traverseX)/18.0;
  traverseY += (targetY - traverseY)/18.0;
}

function mousePressed() {
  for (var i = 0; i < eventBoxes.length; i++) {
    if(eventBoxes[i].hovered) {
      curIndex = i;
      targetX = eventBoxes[(i+1)%(eventBoxes.length)].x - width/2.0;
      targetY = eventBoxes[(i+1)%(eventBoxes.length)].y - height/2.0;
      transMax = 8;
      for (var h = 0; h < 25; h++) {
        //append(parts, new Particle(ex, ey, random(5,13), random(2,13), color(255,213,12)));
        //append(parts, new Particle(eventBoxes[i].x, eventBoxes[i].y, random(5,transMax*2), random(2,transMax*2), color(225,153,0)));
      }
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
    
    rect(0,0, this.sz, this.sz,5);
    fill(255);
    textAlign(CENTER, CENTER);
    text(this.desc, 0, -10);
    text(this.creation, 0, 10);
    pop();
  }
  
  this.update = function() {
    if (this.interact()) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }
    if (this.sz > this.initSz) {
      this.sz *= 0.98;
    }
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
  
  this.rCheck = random(1);
  
  this.display = function() {
    if(this.vel.mag() > 1.3) {
      push();
      translate(this.x, this.y);
      if (this.rCheck > 0.2) {
        noStroke();
        fill(this.fillCol);
      } else {
        noFill();
        stroke(this.fillCol);
        strokeWeight(2);
      }
      ellipse(-traverseX*2,-traverseY*2,this.rad,this.rad);
      pop();
    }
  }
  
  this.update = function() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.mult(0.98);
  }
}
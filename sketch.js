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
var interacting = false;
var fbImg;
var eventData = [];

function setup() { 
  main_canvas = createCanvas(window.innerWidth, window.innerHeight);
  main_canvas.parent('canvasContainer');
  
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

	fbImg = loadImage("facebookThumb.png");

	dataSetup();

  createEvents();
  
  targetX = eventBoxes[0].x - width/2.0;
  targetY = eventBoxes[0].y - height/2.0;
  
} 

function dataSetup() {
	for (var i = 0; i < 8; i++) {
		eventData[i] = [];
	}
	//event 1
	append(eventData[0], "14/10/2011");
	append(eventData[0], "October the Thirteenth");
	append(eventData[0], "Mount Maunganui");
	append(eventData[0], "Attended");
	//event 2
	append(eventData[1], "22/12/2012");
	append(eventData[1], "Camping with the science homies");
	append(eventData[1], "Mount Maunganui");
	append(eventData[1], "Attended");
	//event 3
	append(eventData[2], "11/05/2013");
	append(eventData[2], "Mafia Party");
	append(eventData[2], "138 Gloucester Road (My house) :D");
	append(eventData[2], "Attended");
	//event 4
	append(eventData[3], "21/12/2012");
	append(eventData[3], "The Hobbit, Rialto Fundraiser");
	append(eventData[3], "Rialto Tauranga Cinemas");
	append(eventData[3], "Declined");
	//event 5
	append(eventData[4], "11/11/2015");
	append(eventData[4], "MATH161 EXAM");
	append(eventData[4], "MCLT103 (for me. check the first post for you)");
	append(eventData[4], "No Reply");
	//event 6
	append(eventData[5], "12/03/2017");
	append(eventData[5], "21");
	append(eventData[5], "The Fat Angel");
	append(eventData[5], "No Reply");
	//event 7
	append(eventData[6], "28/05/2016");
	append(eventData[6], "strawberry fare is closing on the 29th and i am sad");
	append(eventData[6], "Strawberry Fare");
	append(eventData[6], "Attended");
	//event 8
	append(eventData[7], "12/09/2013");
	append(eventData[7], "The Taming of the Shrew");
	append(eventData[7], "Detour Theatre");
	append(eventData[7], "Attended");
}

function createEvents() {
  var numEvents = 8;
  for (var i = 0; i < numEvents; i++) {
    append(eventBoxes, new LifeEventBox(random(50,300), random(-width*2,width*2), random(-height*2,height*2), eventData[i][0], eventData[i][1], eventData[i][2], eventData[i][3]));
  }

  for (var j = 0; j < numEvents; j++) {
    for (var h = 0; h < numEvents; h++) {
    	if(dist(eventBoxes[j].x, eventBoxes[j].y, eventBoxes[h].x, eventBoxes[h].y) < 300 && h != j) {
    		eventBoxes[j].x = random(-width*2,width*2);
    		eventBoxes[j].y = random(-height*2,height*2);
    		h = 0;
    	} 
  	}
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
  
  
  
  translate(traverseX, traverseY);
  
  for (var j = 0; j < parts.length; j++) {
    parts[j].display();
    parts[j].update();
  }
  
  push();
  beginShape();
	
  noFill();
  stroke(200);
  strokeWeight(2);

  vertex(eventBoxes[curIndex].x- (traverseX*2), eventBoxes[curIndex].y- (traverseY*2));
  vertex((width/2.0)-traverseX, (height/2.0)-traverseY);
  vertex(eventBoxes[targetIndex].x- (traverseX*2), eventBoxes[targetIndex].y- (traverseY*2));
  
  endShape();
  pop();
  
  ellipse(width/2.0-traverseX, height/2.0-traverseY, 11,11);
  
  interacting = false;
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
		interacting = true;
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
		if (i == curIndex) {
			curIndex = (curIndex+1)%(eventBoxes.length);
			if (curIndex != 0) {
				targetIndex = curIndex - 1;
			} else {
				targetIndex = eventBoxes.length-1;
			}
		} else {
			curIndex = (i+1)%(eventBoxes.length);
			if (curIndex != 0) {
				targetIndex = curIndex - 1;
			} else {
				targetIndex = eventBoxes.length-1;
			}
		}
      targetX = eventBoxes[(i+1)%(eventBoxes.length)].x - width/2.0;
      targetY = eventBoxes[(i+1)%(eventBoxes.length)].y - height/2.0;
      transMax = 5;
      // for (var h = 0; h < 25; h++) {
//         //append(parts, new Particle(ex, ey, random(5,13), random(2,13), color(255,213,12)));
//         append(parts, new Particle(eventBoxes[(i+1)%(eventBoxes.length)].x, eventBoxes[(i+1)%(eventBoxes.length)].y, random(5,transMax*2), random(2,transMax*2), color(225,153,0)));
//       }
    }
  }
}

function LifeEventBox (numLikes, xpos, ypos, datetime, description, location, status) {
  this.sz = map(min(numLikes,200), 0, 200, 90, 240);
  this.textBox = this.sz;
  this.initSz = this.sz;
  this.x = xpos;
  this.y = ypos;
  this.creation = datetime;
  this.desc = description;
  this.loc = location;
  this.stat = status.toUpperCase();
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
    fill(248,248,255);
    rectMode(CORNER);
	textAlign(LEFT, TOP);
	var newTxt = min(map(this.sz,30,140,12,30),30);
	textSize(map(this.desc.length, 5, 42, newTxt, max(newTxt-6, 12)));
	text(this.desc, -this.sz/2.0+min(map(this.sz,30,120,5,10),10), (this.sz/2.0) + min(map(this.sz,30,120,10,30),30) + 40, this.textBox - 10, 200);
	var curTxtSz = min(map(this.sz,30,140,8,18),18);
	textSize(curTxtSz);
	fill(180,180,188);
	text(this.creation, -this.sz/2.0+min(map(this.sz,30,120,5,10),10), (this.sz/2.0) + min(map(this.sz,30,120,5,10),10) + 35, this.textBox - 10, 200);
	textAlign(LEFT, TOP);
    if (this.hovered) {
    	fill(112,201,255);
    } else {
		fill(225,173,12);
    }
    textSize(map(this.loc.length, 5, 42, curTxtSz, 10));
	text(this.loc, -this.sz/2.0+min(map(this.sz,30,120,5,10),10), (this.sz/2.0) + min(map(this.sz,30,120,3,8),8), this.textBox-10, 200);
	textAlign(LEFT, BOTTOM);
	if(this.hovered) {
		textSize(min(map(this.sz,30,140,11,20),20))
		if (this.stat == "ATTENDED") {
			fill(255);
		} else {
			fill(145,93,0);
		}
		text(this.stat, -this.sz/2.0+min(map(this.sz,30,120,5,10),10), (this.sz/2.0) - min(map(this.sz,30,120,5,10),10))
	}
    pop();
  }
  
  this.update = function() {
    if (this.interact()) {
		if (!this.hovered) {
      	  this.hovered = true;
	      for (var h = 0; h < 8; h++) {
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
      ellipse(0,0,this.rad*6,this.rad*6);
	  image(fbImg, 0, 0, this.rad*5, this.rad*5);
      pop();
    }
  }
  
  this.update = function() {
	  if (interacting) {
		  this.fillCol = color(225,153,0);
	  } else {
		  this.fillCol = color(112,201,255);
	  }
    this.x += this.vel.x;
    this.y += this.vel.y;
	this.ang += this.angVel;
	this.rad *= 0.99;
    this.vel.mult(0.98);
  }
}
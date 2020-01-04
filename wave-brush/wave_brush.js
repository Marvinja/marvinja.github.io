let orb;
let orb2;
let col;

//URL Param
let mode;
let bground;
let urlCol;
let blend;
let sec;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  //URL Parameters Initialisation
  let param = getURLParams();
  console.log(param);
  // param.hasOwnProperty('bg') || param.hasOwnProperty('col') || param.hasOwnProperty('blend') ? mode = 1 : mode = 0;
  param.hasOwnProperty('bg') ? bground = param.bg.split(",") : bground = [0, 0, 0, 20];
  param.hasOwnProperty('col') ? urlCol = param.col.split(",") : null;
  param.hasOwnProperty('blend') ?
    param.blend == "MULTIPLY" ? blend = MULTIPLY : null
  : blend = ADD;
  param.hasOwnProperty('s') ? sec = param.s : sec = 10;


  //initialise object
  orb = new Orb(random(width), random(height));
  orb2 = new Orb(random(width), random(height));


  param.hasOwnProperty('col') ? col = setColour(urlCol[0], urlCol[1], urlCol[2], 30) : col = setColour(random(255), random(255), random(255), 30)
  background(bground[0], bground[1], bground[2]);
}


function draw() {
  blendMode(NORMAL);
  if (frameCount % (60*sec) == 0) {
      fill(bground[0], bground[1], bground[2]);
      noStroke();
      rect(-width/2, 0, width*2, height);
      urlCol ? col = setColour(urlCol[0], urlCol[1], urlCol[2], 30) : col = setColour(random(255), random(255), random(255), 30);
  }
  translate(width/2, 0);
  orb.display();
  orb.update();
  orb2.display();
  orb2.update();
  blendMode(blend);
  strokeWeight(2);
  stroke(col);
  if (dist(orb.position.x, orb.position.y, orb2.position.x, orb2.position.y)) {
    line(orb.position.x, orb.position.y, orb2.position.x, orb2.position.y);
    line(-orb.position.x, orb.position.y, -orb2.position.x, orb2.position.y);
  }
}

function setColour(r,g,b,a) {
    return color(r, g, b, a);
}

class Orb {
  constructor(_x, _y) {
    this.position = createVector(_x, _y);
    this.easing = random(0.01, 0.06);
    this.targetPosition = createVector(random(-width/2, width/2), random(-height/4, height + height/4));
    this.targetPosition2 = createVector(random(-width/2, width/2), random(-height/4, height + height/4));
  }

  display() {
    fill(255, 10, 150);
    noStroke();
    //ellipse(this.position.x, this.position.y, 5, 5);
  }

  update() {
    this.position.x += (this.targetPosition.x - this.position.x) * this.easing;
    this.position.y += (this.targetPosition.y - this.position.y) * this.easing;
    this.targetPosition.x += (this.targetPosition2.x - this.targetPosition.x) * this.easing;
    this.targetPosition.y += (this.targetPosition2.y - this.targetPosition.y) * this.easing;
    if (dist(this.targetPosition.x, this.targetPosition.y, this.targetPosition2.x, this.targetPosition2.y) < 100) {
      this.targetPosition2 = createVector(random(-width/2, width/2), random(-height/4, height + height/4));
    }
  }
}

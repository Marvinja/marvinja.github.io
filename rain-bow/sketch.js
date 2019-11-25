var font, fontSize = 32;
var home = "Home";
var particles = 1000;
var rain = [];

function preload() {
  font = loadFont("./fonts/Raleway-Regular.ttf");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('container');

  for (var i = 0; i < particles; i ++) {
    rain[i] = new RainDrop();
  }

  //Font setup
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  for (var i = 0; i < rain.length; i ++) {
    rain[i].display();
    rain[i].move();
  }

  fill(0);
  noStroke();

  // var opac = map(dist(mouseX, mouseY, width/2, height/2+height*0.2), 0, width*0.2, 255, 0);
  // fill(255, opac);
  // text(home, width/2, height/2+height*0.2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class RainDrop {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = 0;
    this.acceleration = random(0.1, 0.3);
    this.length = map(this.acceleration, 0.1, 0.5, 10, 50);
    this.width = map(this.acceleration, 0.1, 0.5, 0.1, 5);
    this.opac = map(this.y, 0, 100, 100, 0);
    this.colSaturation = random(25,75);
    this.floor = height + 100 + random(200);
  }

  display() {
    colorMode(HSB, 360, 100, 100, 100);
    var mouseDist = dist(mouseX, mouseY, this.x, this.y);
    var colHue = map(this.x, 0, width, 0, 360);
    this.opac = map(this.y, 0, height + 500, 100, 0);
    stroke(colHue, this.colSaturation, 100, this.opac);
    strokeWeight(this.width);
    line(this.x, this.y, this.x, this.y - this.length);
  }

  move() {
    this.speed = constrain(this.speed, 0,2);
    this.speed += this.acceleration;
    this.y += this.speed;
    this.reset();
  }

  respawn() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.floor = height + random(200);
    this.speed = 0;
  }

  reset() {
    if (this.y > this.floor) {
      this.respawn();
    }

    // if ((this.y > height/2+height*0.2) && (this.x > width/2 - textWidth(home)/2) && (this.x < width/2 + textWidth(home)/2)) {
    //   this.respawn();
    // }
  }
}

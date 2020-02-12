var particles = 1000;
var rain = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < particles; i ++) {
    rain[i] = new RainDrop();
  }
}

function draw() {
  background(0);

  for (var i = 0; i < rain.length; i ++) {
    rain[i].display();
    rain[i].move();
  }

  fill(0);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class RainDrop {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = 0;
    this.acceleration = random(0.01, 0.05);
    this.length = map(this.acceleration, 0.01, 0.05, 10, 50);
    this.width = map(this.acceleration, 0.01, 0.05, 1, 2);
    this.colSaturation = random(25,75);
    this.floor = height + 100 + random(200);
  }

  display() {
    colorMode(HSB, 360, 100, 100, 100);
    var mouseDist = dist(mouseX, mouseY, this.x, this.y);
    var colHue = map(this.x, 0, width, 0, 360);
    this.opac = map(this.y, 0, height + 100, 100, 0);
    stroke(colHue, this.colSaturation, 100, this.opac);
    strokeWeight(this.width);
    line(this.x, this.y, this.x, this.y - this.length);
  }

  move() {
    this.speed = constrain(this.speed, 0, 9.8);
    this.speed += this.acceleration;
    this.y += this.speed;
    this.reset();
  }

  respawn() {
    this.x = random(width);
    this.y = random(-height, -height/2);
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

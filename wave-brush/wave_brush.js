let orb;
let orb2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //initialise object
  orb = new Orb(random(width), random(height));
  orb2 = new Orb(random(width), random(height));

}


function draw() {
  if (second() % 10 == 0) {
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);
  }
  orb.display();
  orb.update();
  orb2.display();
  orb2.update();

  strokeWeight(2);
  stroke(255, 20);
  if (dist(orb.position.x, orb.position.y, orb2.position.x, orb2.position.y)) {
    line(orb.position.x, orb.position.y, orb2.position.x, orb2.position.y);
  }
}

class Orb {
  constructor(_x, _y) {
    this.position = createVector(_x, _y);
    this.easing = random(0.01, 0.06);
    this.targetPosition = createVector(random(-width/4, width+ width/4), random(-height/4, height + height/4));
    this.targetPosition2 = createVector(random(-width/4, width+ width/4), random(-height/4, height + height/4));
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
      this.targetPosition2 = createVector(random(-width/4, width+ width/4), random(-height/4, height + height/4));
    }
  }
}

var diamonds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100);

  for (var i = 0; i < width/60; i ++) {
      for (var j = 0; j < height/60; j ++) {
          if (j % 2 == 0) {
              diamonds.push(new Diamond(i * 60, j * 60));
          } else {
              diamonds.push(new Diamond(30 + i * 60, j * 60));
          }
      }
  }
}


function draw() {
  background(0);
  for (var i = 0; i < diamonds.length; i ++) {
      diamonds[i].display();
      diamonds[i].update();
  }
}

class Diamond {
  constructor(_x, _y) {
    this.position = createVector(_x, _y);
    //Colour: #A86F3D 28 47 45;
    this.yellow = color(34, 35, 38);
    //Colour: #2F1F12 27 45 13;
    this.darkyellow = color(35, 26, 14);
    this.speed = random(-0.5, 0.5);
    this.offset = 7.5;
    this.pulseSpeed = random(-0.2, 0.2);
    this.minOffset = 5;
    this.maxOffset = 10;
  }

  display() {
      var lerpVal = map(this.position.y, 0, height, 0, 1);
      var col = lerpColor(this.yellow, this.darkyellow, lerpVal)
      fill(col);
      noStroke();
      beginShape();
        vertex(this.position.x - this.offset, this.position.y);
        vertex(this.position.x, this.position.y - this.offset);
        vertex(this.position.x + this.offset, this.position.y);
        vertex(this.position.x, this.position.y + this.offset);
      endShape(CLOSE);
  }

  update() {
      //Move down
      this.position.y += this.speed;
      //When below the screen, reset back to the top
      if (this.position.y > height + 10) {
          this.position.y = -10;
      }

      //Pulse
      this.offset += this.pulseSpeed;
      if (this.offset > this.maxOffset || this.offset < this.minOffset) {
          this.pulseSpeed *= -1;
      }
  }

}

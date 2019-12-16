var diamonds = [];

//URL Param
var bground = [];
var color1 = [];
var color2 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSL, 360, 100, 100, 100);
  //URL Parameters Initialisation
  var param = getURLParams();
  console.log(param);
  param.hasOwnProperty('bg') ? bground = param.bg.split(",") : bground = [0,0,0];
  param.hasOwnProperty('color1') ? color1 = param.color1.split(",") : color1 = [34, 35, 38];
  param.hasOwnProperty('color2') ?color2 = param.color2.split(",") : color2 = [35, 26, 14];

  //Object Initialisation
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
  background(bground[0], bground[1], bground[2]);
  for (var i = 0; i < diamonds.length; i ++) {
      diamonds[i].display();
      diamonds[i].update();
  }
}

class Diamond {
  constructor(_x, _y) {
    this.position = createVector(_x, _y);
    //Colour: #A86F3D 28 47 45;
    this.yellow = color(color1[0], color1[1], color1[2]);
    //Colour: #2F1F12 27 45 13;
    this.darkyellow = color(color2[0], color2[1], color2[2]);
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

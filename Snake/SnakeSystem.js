const colourSet = ["#f79f79", "#f7d08a", "#ead2ac", "#f2efea", "#364652"];
let numSnakes = 200;
let snakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);

  for (let i = 0; i < numSnakes; i ++) {
    snakes[i] = new Snake(int(random(5, 10)));
  }
}


function draw() {
  background(0);
  push();
  translate(-width/2, -height/2);
  for (let i = 0; i < snakes.length; i ++) {
    snakes[i].update();
    snakes[i].display();
  }
  pop();

}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

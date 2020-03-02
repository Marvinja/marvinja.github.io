class Snake {
  constructor(numPoints) {
    this.numPoints = numPoints;
    this.points = [];

    this.noiseValue = createVector(random(100), random(100));
    this.noiseInc = createVector(random(10)*0.0001, random(10)*0.0001);
    this.easing = random(0.05, 0.1);
    let colNum = int(random(colourSet.length));
    this.col = color(colourSet[colNum]);
    for (let i = 0; i < this.numPoints; i ++) {
      this.points[i] = createVector(noise(this.noiseValue.x) * width*2, noise(this.noiseValue.y) * height*2);
    }
  }

  update() {
    this.noiseValue.add(this.noiseInc);
    this.points[0].x = noise(this.noiseValue.x) * width*2;
    this.points[0].y = noise(this.noiseValue.y) * height*2;
  }

  display() {
    stroke(this.col);
    fill(this.col);
    let distance = dist(this.points[0].x, this.points[0].y, this.points[this.numPoints-1].x, this.points[this.numPoints-1].y)
    ellipse(this.points[0].x, this.points[0].y, distance*0.3, distance*0.3);

    for (let i = 1; i < this.points.length; i ++) {
      this.points[i].x += (this.points[i-1].x - this.points[i].x) * this.easing;
      this.points[i].y += (this.points[i-1].y - this.points[i].y) * this.easing;
      fill(this.col);
      let distance = dist(this.points[i].x, this.points[i].y, this.points[i-1].x, this.points[i-1].y)
      ellipse(this.points[i].x, this.points[i].y, distance*(this.numPoints-i)*0.3, distance*(this.numPoints-i)*0.3);
    }
  }
}

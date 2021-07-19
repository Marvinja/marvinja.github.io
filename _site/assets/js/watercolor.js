
let watercolor_sketch = function(w) {
  let hero = document.getElementById('hero');

  let cnv;

  let pd = [];
  let count = 0;

  w.setup = () => {
    cnv = w.createCanvas(hero.clientWidth, hero.clientHeight);
    cnv.id('watercolor-canvas');
    w.frameRate(20);

    //Hero
    w.background(250, 246, 235);

    let randCol = w.random(255);
    for (let i = 0; i < 30; i ++) { pd.push(new PaintDrop(randCol)); }
  }

  w.draw = () => {
    // w.background(0);
    // w.background(250, 246, 235);
    if (pd.every(p => p.hasStopped() > 40)) {
      pd.forEach(p => {
        p.display();
      });
    } else {
      console.log("The sketch has stopped drawing.");
    }
  }

  w.windowResized = () => {
    w.resizeCanvas(hero.clientWidth, hero.clientHeight);
    w.background(0);
  }

  class PaintDrop {
    constructor(_col) {
      this.position = w.createVector(w.random(w.width*0.4, w.width), w.random(w.height*0.25, w.height*0.75));
      this.col = [_col, 200, 150];
      this.startingRad = w.random(50, 100);
      this.startPoints = []; // Starting points on the circle
      this.targetPoints = []; // The end point for each point in the cirle
      this.easing = 0.01;
      for (let i = 0; i < w.TWO_PI; i += 0.2) {
        let xoff = w.map(w.cos(i), -1, 1, 0, 100);
        let yoff = w.map(w.sin(i), -1, 1, 0, 100);
        let r = w.map(w.noise(xoff  + w.random(100), yoff + w.random(100)), 0, 1, this.startingRad, this.startingRad*2);
        let a = w.cos(i) * r;
        let b = w.sin(i) * r;
        this.startPoints.push(w.createVector(a, b));
        let ta = w.cos(i) * (r + w.random(50, 100));
        let tb = w.sin(i) * (r + w.random(50, 100));
        this.targetPoints.push(w.createVector(ta, tb));
      }
    }

    display() {
      // Update start points position
      w.push();
      w.colorMode(w.HSB, 255, 255, 255, 255);
      w.translate(this.position.x, this.position.y);
      w.beginShape();
        w.fill(this.col[0], this.col[1], this.col[2], 1);
        w.stroke(this.col[0], this.col[1], this.col[2], 0);
        // w.strokeWeight( w.random(2));
        this.startPoints.forEach((p, index) => { w.curveVertex(p.x, p.y); });
      w.endShape(w.CLOSE);
      w.pop();

      this.startPoints.forEach((sp, index) => {
        sp.x = w.lerp(sp.x, this.targetPoints[index].x, 0.2);
        sp.y = w.lerp(sp.y, this.targetPoints[index].y, 0.2);
      });
    }

    hasStopped() {
      let distanceTotal = this.startPoints.map((sp, index) => w.dist(sp.x, sp.y, this.targetPoints[index].x, this.targetPoints[index].y)).reduce((acc, curr) => acc + curr);
      return distanceTotal;
    }
  }

}


let p5_watercolor = new p5(watercolor_sketch, 'hero');

// TODO

/*
  - Create watercolor class
  - Spawn circle shape with points
  - points slowly move with noise for 5 seconds
*/

class TestSketch {
  constructor(canvasWidth, canvasHeight, parent) {
    this.sketch =  new p5(function(t) {
      let cnv;
      let orbs = [];
      let numOrbs = 20;

      t.setup = () => {
        cnv = t.createCanvas(canvasWidth, canvasHeight);
        cnv.style('filter', 'blur(150px)');
        t.colorMode(t.HSB, 360, 100, 100, 100);
        t.background(0, 0, 0, 0);

        let randCol = t.random(180);
        for(let i = 0; i < numOrbs; i ++) {
          orbs[i] = new Orb(randCol + (10 * i), t.height/2, t.random(0.001, 0.005));
        }
      }

      t.draw = () => {
        t.background(0, 0, 20, 100);
        orbs.forEach(o => {
          o.display();
        });
      }

      class Orb {
        constructor(_color, _radius, _speed) {
          this.color = _color;
          this.radius = _radius;
          this.speed = _speed;
          this.offset = 0;
          this.position = t.createVector(t.random(-1000, 1000), t.random(-1000, 1000));
        }

        display() {
          this.offset += this.speed;
          t.push();
          t.translate(-t.width/2, -t.height/2);
          t.fill(this.color, 50, 70);
          t.ellipse(t.noise(this.position.x + this.offset) * t.width*2, t.noise(this.position.y + this.offset) * t.height*2, this.radius, this.radius);
          t.pop();
        }
      }

    }, parent);
  }
}



let hero = document.getElementById('hero');
let t1 = new TestSketch(hero.clientWidth, hero.clientHeight, 'hero');

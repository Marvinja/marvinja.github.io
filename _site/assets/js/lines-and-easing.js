let flow_lines = function(f) {
  let point1, point2, targetPoint;
  let resetNum = 0;
  let easing1 = 0.06;
  let easing2 = 0.03;
  let points = [];
  let col = [];

  f.setup = () => {
    let cnv = f.createCanvas(lae_parent.clientWidth, lae_parent.clientHeight);

    cnv.id('lae-canvas');

    point1 = f.createVector(f.width/2, f.height/2);
    point2 = f.createVector(f.width/2, f.height/2);
    targetPoint = f.createVector(f.width/2, f.height/2);

    col = [f.random(255), f.random(255), f.random(255), f.random(50)];

    f.background(0);
    f.filter(f.BLUR, 10);
  }

  f.draw = () => {
    // if (mouseIsPressed) {  }
    if (resetNum >= 20) {
      resetNum = 0;
      f.background(0);
      col = [f.random(255), f.random(255), f.random(255), f.random(50)];
    }

    f.blendMode(f.ADD);

    f.stroke(col[0], col[1], col[2], col[3]);

    points.forEach((p,i) => {
      if (f.dist(point2.x, point2.y, p.x, p.y) < 100) {
        f.line(point2.x, point2.y, p.x, p.y);
      }
    });


    f.blendMode(f.BLEND);

    f.fill(0);
    f.noStroke();
    f.rect(0, 0, 50, 20);
    f.stroke(255);

    // Update
    point1.x += (targetPoint.x - point1.x) * easing1;
    point1.y += (targetPoint.y - point1.y) * easing1;
    point2.x += (point1.x - point2.x) * easing2;
    point2.y += (point1.y - point2.y) * easing2;


    points.push(f.createVector(point1.x, point1.y));

    if (points.length > 100) { points.shift(); }

    if (f.dist(targetPoint.x, targetPoint.y, point1.x, point1.y) < 10) { targetPoint = f.createVector(f.random(f.width), f.random(f.height)); resetNum ++; }
  }

  f.windowResized = () => {
    f.resizeCanvas(hero.clientWidth, hero.clientHeight);
    f.background(0);
  }
}

let amber_rain = function(a) {
  let diamonds = [];
  let bground = [];
  let color1 = [];
  let color2 = [];

  let hero = document.getElementById('hero');
  let parent = document.getElementById('amber-rain');
  let p_cnv;

  a.setup = () => {
    let cnv = a.createCanvas(hero.clientWidth, hero.clientHeight);
    p_cnv = a.createGraphics(parent.clientWidth, parent.clientHeight);

    cnv.id('amber-rain-canvas');

    p_cnv.parent(parent);
    p_cnv.style('display', 'block');

    a.colorMode(a.HSL, 360, 100, 100, 100);
    p_cnv.colorMode(p_cnv.HSL, 360, 100, 100, 100);
    //URL Parameters Initialisation
    let param = a.getURLParams();
    console.log(param);
    param.hasOwnProperty('bg') ? bground = param.bg.split(",") : bground = [0,0,0];
    param.hasOwnProperty('color1') ? color1 = param.color1.split(",") : color1 = [34, 35, 38];
    param.hasOwnProperty('color2') ?color2 = param.color2.split(",") : color2 = [35, 26, 14];

    //Object Initialisation
    for (var i = 0; i < a.width/60; i ++) {
        for (var j = 0; j < a.height/60; j ++) {
            if (j % 2 == 0) {
                diamonds.push(new Diamond(i * 60, j * 60));
            } else {
                diamonds.push(new Diamond(30 + i * 60, j * 60));
            }
        }
    }
  }

  a.draw = () => {
    a.background(bground[0], bground[1], bground[2]);
    p_cnv.background(bground[0], bground[1], bground[2]);
    for (var i = 0; i < diamonds.length; i ++) {
        diamonds[i].display();
        diamonds[i].update();
    }
  }

  a.windowResized = () => {
    a.resizeCanvas(hero.clientWidth, hero.clientHeight);
    p_cnv.resizeCanvas(parent.clientWidth, parent.clientHeight);

    a.background(bground[0], bground[1], bground[2]);
    p_cnv.background(bground[0], bground[1], bground[2]);

    a.redraw();
    p_cnv.redraw();
  }

  class Diamond {
    constructor(_x, _y) {
      this.position = a.createVector(_x, _y);
      //Colour: #A86F3D 28 47 45;
      this.yellow = a.color(color1[0], color1[1], color1[2]);
      //Colour: #2F1F12 27 45 13;
      this.darkyellow = a.color(color2[0], color2[1], color2[2]);
      this.speed = a.random(-0.5, 0.5);
      this.offset = 7.5;
      this.pulseSpeed = a.random(-0.2, 0.2);
      this.minOffset = 5;
      this.maxOffset = 10;
    }

    display() {
        var lerpVal = a.map(this.position.y, 0, a.height, 0, 1);
        var col = a.lerpColor(this.yellow, this.darkyellow, lerpVal);
        a.fill(col);
        a.noStroke();
        a.beginShape();
          a.vertex(this.position.x - this.offset, this.position.y);
          a.vertex(this.position.x, this.position.y - this.offset);
          a.vertex(this.position.x + this.offset, this.position.y);
          a.vertex(this.position.x, this.position.y + this.offset);
        a.endShape(a.CLOSE);

        // Portfolio Canvas
        let p_position = a.createVector(a.map(this.position.x, 0, a.width, 0, p_cnv.width), a.map(this.position.y, 0, a.height, 0, p_cnv.height));
        let p_offset = a.map(this.offset, 0, a.height, 0, p_cnv.height);
        let p_lerpVal = a.map(p_position.y, 0, p_cnv.height, 0, 1);
        var p_col = a.lerpColor(this.yellow, this.darkyellow, p_lerpVal);
        p_cnv.fill(p_col);
        p_cnv.noStroke();
        p_cnv.beginShape();
          p_cnv.vertex(p_position.x - p_offset, p_position.y);
          p_cnv.vertex(p_position.x, p_position.y - p_offset);
          p_cnv.vertex(p_position.x + p_offset, p_position.y);
          p_cnv.vertex(p_position.x, p_position.y + p_offset);
        p_cnv.endShape(a.CLOSE);

    }

    update() {
        //Move down
        this.position.y += this.speed;
        //When below the screen, reset back to the top
        if (this.position.y > a.height + 10) {
            this.position.y = -10;
        }

        //Pulse
        this.offset += this.pulseSpeed;
        if (this.offset > this.maxOffset || this.offset < this.minOffset) {
            this.pulseSpeed *= -1;
        }
    }
  }
}

let p5_amberrain = new p5(amber_rain, 'hero');

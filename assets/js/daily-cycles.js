class DailyCycle {
  constructor(canvasWidth, canvasHeight, parent) {
    this.sketch = new p5(function(dc) {
      //star variables
      let starX = [];
      let starY = [];
      let radius = [];
      let maxRadius = [];
      let speed = [];
      let numStar = 20;

      //wave variables
      let yOffset = 0;

      //cloud variables
      let cloudX = [];
      let cloudY = [];
      let cloudSpeed = [];

      //mountain variables
      let mountain1 = [];
      let mountain2 = [];
      let mountain3 = [];
      let mountainDetail = 20; // Number of points on the mountain

      dc.setup = () => {
        dc.createCanvas(canvasWidth, canvasHeight);
        dc.noStroke();
        dc.noCursor();
        //Initialise star variables
        for(var i = 0; i < numStar; i ++){
           starX[i] = dc.random(dc.width);
           starY[i] = dc.random(dc.height/2);
           radius[i] = 0;
           maxRadius[i] = dc.random(5, 15);
           speed[i] = dc.random(0.05, 0.25);
        }

        //Initialise cloud variables
        for(var i = 0; i < 5; i ++){
          cloudX[i] = dc.random(dc.width);
          cloudY[i] = i*50;
        }

        let mountainNoise = [dc.random(dc.width), dc.random(dc.width), dc.random(dc.width)];
        //Initial mountain variables
        for (let i = 0; i < mountainDetail; i ++) {
          mountain1[i] = dc.noise(mountainNoise[0] + i*0.2)*dc.height/2;
          mountain2[i] = dc.noise(mountainNoise[1] + i*0.2)*dc.height/2;
          mountain3[i] = dc.noise(mountainNoise[2] + i*0.2)*dc.height/2;
        }
      }

      dc.draw = () => {
        //Day/night cycle background colours
        var cycle = dc.map(dc.mouseY, 0, dc.height, 0, 1);
        var night = dc.color(82, 77, 130);
        var day = dc.color(255, 205, 168);
        var gradient = dc.lerpColor(day, night, cycle);

        dc.background(gradient);

        //mapping day/night cycle to mouse
        let SunY = dc.map(dc.mouseY, 0, dc.height, 60, dc.height+75);
        let sy = dc.constrain(SunY, 60, dc.height+75);
        dc.fill(247, 247, 156);
        dc.ellipse(360, sy, 100);

        let MoonY = dc.map(dc.mouseY, 0, dc.height, dc.height+75, 60);
        let my = dc.constrain(MoonY, 60, dc.height+75);
        dc.fill(255);
        dc.ellipse(360, my, 100);

        //create numStars amount of stars
        for(let i = 0; i < numStar; i ++){

          //stars change size (pulse)
          radius[i] += speed[i];

          //stars slow down when the raidus is greater than maxRadius
          if (radius[i] > maxRadius[i]) {
          	speed[i] *= -1;
          }

          //stars reappear in a random location and grow in size, after the radius is no longer visible (<0)
          if (radius[i] < 0) {
      			speed[i] *= -1;
      			starX[i] = dc.random(dc.width);
      			starY[i] = dc.random(0, dc.height/2);
          }

          //stars disppear during the day
          var starOpacity = dc.map(dc.mouseY, 0, dc.height-100, 0, 255);

          dc.push();
          dc.fill(255, starOpacity);
          dc.strokeWeight(2);
          dc.stroke(255, starOpacity-200);
          dc.ellipse(starX[i], starY[i], radius[i]);
          dc.pop();
        }
        //clouds
        let cloudCol = dc.constrain(dc.mouseY, 100, 255);
        dc.fill(dc.map(cloudCol, 0, dc.height, 255, 100));
        //drawing clouds
        for(var i = 0; i < 5; i ++){
          dc.clouds(cloudX[i], cloudY[i]);
          cloudX[i] = cloudX[i] + 0.5;
      		//clouds have jitter movement in y-axis
          cloudY[i] = cloudY[i] + dc.random(-0.5, 0.5);

        //when clouds reach beyond edge of screen, clouds reset to original side
          if (cloudX[i] > dc.width+50) {
            cloudX[i] = -50;
          }
        }
        //drawing the mountains and mountain reflections
        //far mountain
        dc.fill(42, 110, 136);
        dc.beginShape();
        dc.vertex(0, dc.height);
        mountain1.forEach((item, i) => {
          dc.vertex(dc.width/(mountain2.length-1) * i, dc.height/3 + item);
        });
        dc.vertex(dc.width, dc.height);
        dc.endShape();

        //mid mountain
        dc.fill(32, 93, 107);
        dc.beginShape();
        dc.vertex(0, dc.height);
        mountain2.forEach((item, i) => {
          dc.vertex(dc.width/(mountain2.length-1) * i, dc.height/2.5 + item);
        });
        dc.vertex(dc.width, dc.height);
        dc.endShape();

        //front mountain
        dc.fill(19, 59, 66);
        dc.beginShape();
        dc.vertex(0, dc.height);
        mountain3.forEach((item, i) => {
          dc.vertex(dc.width/(mountain2.length-1) * i, dc.height/2 + item);
        });
        dc.vertex(dc.width, dc.height);
        dc.endShape();



        /*---------- WATER ----------*/
        for(var i = 0; i < 4; i++){
          dc.push();

      		//mapping water colour to mouse, to match time of day
          dc.colorMode(dc.HSB, 360, 100, 100, 100);
      		//"i" is used for the colour gradient
          let from = dc.color(209, 26, 95-(i*10), 95);
          let to = dc.color(178, 10, 95-(i*5), 95);
          let waterCol = dc.lerpColor(from, to, cycle); //cycle is already mapped from 0 to 1
          dc.fill(waterCol);

      		//drawing waves from the top layer to the bottom
          dc.waves(dc.height+(i*20), (dc.height*0.75)+(i*10), i);
          dc.pop();
        }

      	//Subtle colour placed ontop of the whole sketch to give it atmosphere
      	//have to change the color from the original to have an opacity level
      	night = dc.color(82, 77, 130, 60);
        day = dc.color(255, 205, 168, 60);
        gradient = dc.lerpColor(day, night, cycle);
      	dc.fill(gradient);
      	dc.rect(0, 0, dc.width, dc.height);
      }

      dc.waves = (minHeight, maxHeight, nStart) => {

        dc.beginShape();
        /* xOffset - x parameter for noise
      	 * yOffset - y parameter for noise */
        let xOffset = nStart;
        for (let x = 0; x <= dc.width; x += (dc.width/16)) {
      		//using noise to determine water flow/waves
          var y = dc.map(dc.noise(xOffset, yOffset), 0, 1, minHeight, maxHeight);
          dc.vertex(x, y);
          xOffset += 0.05;
        }
        yOffset += 0.001;
      	//setting vertex to width and height so the water reaches the edge of the canvas
        dc.vertex(dc.width, dc.height);
        dc.vertex(0, dc.height);

        dc.endShape(dc.CLOSE);
      }

      dc.clouds = (x, y) => {
        dc.ellipse(x, y, 30);
        dc.ellipse(x+10, y, 25);
        dc.ellipse(x+10, y-10, 30);
        dc.ellipse(x+20, y, 25);
        dc.ellipse(x+30, y, 25);
      }

      dc.windowResized = () => {
        let imgsize = document.querySelector('img.img-fluid');
        dc.resizeCanvas(imgsize.clientWidth, imgsize.clientHeight);
      }
    }, parent);
  }
}

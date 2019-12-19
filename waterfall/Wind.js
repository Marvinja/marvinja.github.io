var inc = 0.1;
var scl = 80;
var cols, rows;

var zoff = 0;

var particle = [];

var flowfield;



function setup() {
	createCanvas(windowWidth, windowHeight);
	cols = floor(width / scl);
	rows = floor(height / scl);
	
	flowfield = new Array(cols * rows);
	
	for (var i = 0; i < 1024; i ++) {
		particle[i] = new Particle();
	}
	
	background(255);
}

function draw() {
	background(0, 1);
	var yoff = 0;
	for (var y = 0; y < rows; y ++) {
		xoff = 0;
		for (var x = 0; x < cols; x ++) {
			var index = x + y * cols;
			var angle = noise(xoff, yoff, zoff) * TWO_PI * 0.1;
			var v = p5.Vector.fromAngle(angle + PI*0.4);
			v.setMag(1);
			flowfield[index] = v;
			xoff += inc;
			// stroke(0, 50);
			// rect(x*scl, y*scl, scl, scl);
			// FlowField
			// push();
			// translate(x * scl, y * scl);
			// rotate(v.heading());
			// line(0, 0, scl, 0);
			// pop();
		}
		yoff += inc;
		zoff += 0.0003;
	}
	
	
	//Drawing Particles
	for (var i = 0; i < particle.length; i ++) {
		particle[i].follow(flowfield);
		particle[i].update();
		particle[i].edges();
		
		colorMode(HSB, 360, 100, 100, 100);
		blendMode(ADD);
		// var col = map(spectrum[i], 0, 255, 128, 0);
		// var size = map(spectrum[i], 0, 255, 0, 20);
		stroke(200, 50, 90, 10);
		strokeWeight(5)
		particle[i].show();
	}
	blendMode(NORMAL);
}
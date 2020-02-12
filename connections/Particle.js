class Particle {
	constructor() {
		this.position = createVector(random(width), random(height));
		this.speed = createVector(random(-1, 1), random(-1, 1));
		this.size = random(5);
		colorMode(HSL, 360, 100, 100, 100);
		this.color = color(random(360) , 50, 40, 50);
	}

	display() {
		noStroke();
		fill(this.color);
		ellipse(this.position.x, this.position.y, this.size*20, this.size*20);
		fill(255, 255, 255);
		ellipse(this.position.x, this.position.y, this.size, this.size);
		this.update();
	}

	move() {
		this.position.add(this.speed);
	}

	update() {
		this.move();
		this.position.x > width ? this.position.x  = 0 : null;
		this.position.x < 0 ? this.position.x  = width : null;
		this.position.y > height ? this.position.y  = 0 : null;
		this.position.y < 0 ? this.position.y  = height : null;
	}
}

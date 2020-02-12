let particles = [];
let numParticles = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);

	background(0);

	for (let i = 0; i < numParticles; i ++) {
		particles.push(new Particle());
	}
}

function draw() {
	background(0, 150);

	for (let i = 0; i < particles.length; i ++) {
		let pi = particles[i];
		for (let j = 0; j < particles.length; j ++) {
			let pj = particles[j];
			let distance = dist(pi.position.x, pi.position.y, pj.position.x, pj.position.y);
			let m_dist = map(distance,0, 100, 255, 0);
			stroke(255, 255, 255, m_dist);
			distance < 100 ? line(pi.position.x, pi.position.y, pj.position.x, pj.position.y) : null;
		}
	}
	blendMode(ADD);
	particles.forEach(function(part) { part.display(); });
	blendMode(BLEND);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

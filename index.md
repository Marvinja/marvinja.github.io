---
layout: main
section: projects
title: Home
---

<div class="portfolio my-4">
  <div class="row">
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="https://icme15.com/" class="mt-4 mb-3 project-image top-right" target="_blank" style="--bg-color: #38A89CAF"><img src="assets/img/icme15.png" class="img-fluid"></a>
      <a href="https://icme15.com/" target="_blank" class="project-content">
        <p class="float-end mb-0">Website</p>
        <h1 class="mb-1">ICME15</h1>
        <h2>ICMS Australasia</h2>
      </a>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="https://bettertogether2022.org/" class="mt-4 mb-3 project-image top-left" target="_blank" style="--bg-color: #008265AF"><img src="assets/img/bettertogether2022.png" class="img-fluid"></a>
      <a href="https://bettertogether2022.org/" target="_blank" class="project-content">
        <p class="float-end mb-0">Website</p>
        <h1 class="mb-1">Better Together 2022</h1>
        <h2>ICMS Australasia</h2>
      </a>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="https://asba2021.com.au/" class="mt-4 mb-3 project-image bottom-left" target="_blank" style="--bg-color: #20809FAF"><img src="assets/img/asba2021.png" class="img-fluid"></a>
      <a href="https://asba2021.com.au/" target="_blank" class="project-content">
        <p class="float-end mb-0">Website</p>
        <h1 class="mb-1">ASBA2021</h1>
        <h2>ICMS Australasia</h2>
      </a>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="https://cospar2021.org/" class="mt-4 mb-3 project-image bottom-right" target="_blank" style="--bg-color: #112B5EAF"><img src="assets/img/cospar2021.png" class="img-fluid"></a>
      <a href="https://cospar2021.org/" target="_blank" class="project-content">
        <p class="float-end mb-0">Website</p>
        <h1 class="mb-1">COSPAR2021</h1>
        <h2>ICMS Australasia</h2>
      </a>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="https://mchappellart.github.io/" class="mt-4 mb-3 project-image center" target="_blank" style="--bg-color: #7D745EAF"><img src="assets/img/mchappellart.png" class="img-fluid"></a>
      <a href="https://mchappellart.github.io/" target="_blank" class="project-content">
        <p class="float-end mb-0">Website</p>
        <h1 class="mb-1">Madeleine Chappell Portfolio</h1>
        <h2>ICMS Australasia</h2>
      </a>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="" class="mt-4 mb-3 project-sketch center" style="--bg-color: #7D745EAF" id="daily-cycle"></a>
      <div class="project-content">
        <p class="float-end mb-0">p5.js</p>
        <h1 class="mb-1">Daily Cycle</h1>
        <h2>Personal</h2>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="" class="mt-4 mb-3 project-sketch center" style="--bg-color: #7D745EAF" id="amber-rain"></a>
      <div class="project-content">
        <p class="float-end mb-0">p5.js</p>
        <h1 class="mb-1">Amber Rain</h1>
        <h2>Personal</h2>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="./watercolor.html" class="my-4 project-sketch center" style="--bg-color: #7D745EAF" id="watercolor"></a>
      <div class="project-content">
        <p class="float-end mb-0">p5.js</p>
        <h1 class="mb-1">Watercolor</h1>
        <h2>Personal</h2>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-4 project">
      <a href="" class="my-4 project-sketch center" style="--bg-color: #7D745EAF" id="linesandeasing"></a>
      <div class="project-content">
        <p class="float-end mb-0">p5.js</p>
        <h1 class="mb-1">Lines and Easing</h1>
        <h2>Personal</h2>
      </div>
    </div>
  </div>
</div>

<script defer>
  let img = document.querySelector('img.img-fluid');
  let dailycycle = new DailyCycle(img.clientWidth, img.clientHeight, 'daily-cycle');
  let amberrain = new AmberRain(img.clientWidth, img.clientHeight, 'amber-rain');
  let watercolor = new Watercolor(img.clientWidth, img.clientHeight, 'watercolor');
  let linesandeasing = new LinesAndEasing(img.clientWidth, img.clientHeight, 'linesandeasing');
</script>

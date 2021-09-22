---
layout: portfolio
title: Watercolor
---

<div class="col-12 col-lg-7 px-0" id="parent">
  <div id="watercolor" class="project-sketch"></div>
</div>
<div class="col-12 col-lg-5 px-0 px-lg-5">
  <h2 class="mt-4 mt-lg-0">{{ page.title }}</h2>
  <p>Watercolor was a small project of mine that was started when an idea was given to me.</p>
  <blockquote><b><em>Can I have a banner for my website that looks like it has been painted with watercolors?</em></b></blockquote>
  <p>I used combination of the random() function for the position of each droplet and the noise() function to simulate the droplet shape. Over time the droplet expands and stops when it reaches a certain size.</p>
  <p>The "watercolor" effect is achieved by simply lowering the opacity of each droplet to 1. As the sketch continues to draw, the overlapping layers add more color to sketch. Having the droplets expand over time also gives that feathered effect towards the edges of each droplet.</p>
  <p>I think in order to improve this sketch I would like to work on slowing down the animation as well as increasing the size of each droplet. I would also like to improve on the shape of the droplet to have rounded edges.</p>
</div>


<script defer>
  let img = document.querySelector('#parent');
  let watercolor = new Watercolor(img.clientWidth, (img.clientWidth*9)/16, 'watercolor');
</script>

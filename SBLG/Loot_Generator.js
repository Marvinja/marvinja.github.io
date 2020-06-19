var quality;
var categorySel, category;
var playerLevelSel, playerLevel;

var item;
var items = [];

function setup() {
  // var canvasDiv = document.getElementById("canvas");
  // var width = canvasDiv.clientWidth - canvasDiv.style.paddingLeft - canvasDiv.style.paddingRight;
  // var canvas = createCanvas(width, 400);
  // canvas.parent("canvas");
  // background(0);
  noCanvas();
}

function Generate() {
  playerLevel = select("#playerLevel").value();
  quality = randomQuality();
  var cat = select("#category").value();
  console.log(`Generating ${playerLevel} ${quality} ${cat}`);
    switch (cat) {
        case 'Pistol': items.push(new Pistol(playerLevel, quality)); break;
        case 'SMG': items.push(new SMG(playerLevel, quality)); break;
        case 'Assault Rifle': items.push(new AssaultRifle(playerLevel, quality)); break;
        case 'Sniper Rifle': items.push(new SniperRifle(playerLevel, quality)); break;
        case 'Shotgun': items.push(new Shotgun(playerLevel, quality)); break;
        case 'Rocket Launcher': items.push(new RocketLauncher(playerLevel, quality)); break;
        case 'Shield': items.push(new Shield(playerLevel, quality)); break;
        case 'Grenade': items.push(new Grenade(playerLevel, quality)); break;
        default: console.log("Invalid Category Found!");
    }
}

function GenerateRandom() {
  playerLevel = select("#playerLevel").value();
  quality = randomQuality();
  console.log(`Generating Random Item: ${playerLevel} ${quality}`);
  RandomItem(RollX(20), playerLevel, quality);
}

function RollX(num) {
    return Math.floor(Math.random()*num + 1);
}

function RandomItem(num, pl, qual) {
  if (num <= 4) { items.push(new Pistol(pl, qual)); }
  else if (num > 4 && num <= 6) { items.push(new SMG(pl, qual)); }
  else if (num > 6 && num <= 8) { items.push(new AssaultRifle(pl, qual)); }
  else if (num > 8 && num <= 10) { items.push(new SniperRifle(pl, qual)); }
  else if (num > 10 && num <= 12) { items.push(new Shotgun(pl, qual)); }
  else if (num == 13) { items.push(new RocketLauncher(pl, qual)); }
  else if (num > 13 && num <= 15) { items.push(new Grenade(pl, qual)); }
  else { items.push(new Shield(pl, qual)); }
}

// function draw() {
//   background(0);
//   fill(255);
//
//   if (item != null) {
//       item.display(10, 100);
//   }
//
// }
//
// function windowResized() {
//   var canvasDiv = document.getElementById("canvas");
//   var width = canvasDiv.clientWidth - canvasDiv.style.paddingLeft - canvasDiv.style.paddingRight;
//   resizeCanvas(width, 400)
// }

function randomQuality() {
    var num = Math.floor(Math.random()*20 + 1);
    if (num <= 12) {
        console.log(`Choosing Quality: Green (${num})`);
        return "Green";
    } else if ((num > 12) && (num <= 17)) {
        console.log(`Choosing Quality: Blue (${num})`);
        return "Blue";
    } else if ((num > 17) && (num <= 19)) {
        console.log(`Choosing Quality: Purple (${num})`);
        return "Purple";
    } else {
        console.log(`Choosing Quality: Orange (${num})`);
        return "Orange";
    }
}

function SetHighlight(id) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i].RemoveHTML();
    }
  }
}

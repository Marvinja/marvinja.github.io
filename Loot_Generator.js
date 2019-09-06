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
  var pl = select("#playerLevel").value();
  quality = randomQuality();
  var cat = select("#category").value();
    if (cat === "Pistol") { items.push(new Pistol(pl, quality)); }
    if (cat === "SMG") { items.push(new SMG(pl, quality)); }
    if (cat === "Assault Rifle") { items.push(new AssaultRifle(pl, quality)); }
    if (cat === "Sniper Rifle") { items.push(new SniperRifle(pl, quality)); }
    if (cat === "Shotgun") { items.push(new Shotgun(pl, quality)); }
    if (cat === "Rocket Launcher") { items.push(new RocketLauncher(pl, quality)); }
    if (cat === "Shield") { items.push(new Shield(pl, quality)); }
    if (cat === "Grenade"){ items.push(new Grenade(pl, quality)); }
}

function GenerateRandom() {
  var pl = select("#playerLevel").value();
  quality = randomQuality();
  RandomItem(RollX(20), pl, quality);
}

function RollX(num) {
    return Math.floor(Math.random()*num + 1);
}

function RandomItem(num, playerLevel, qual) {
  if (num <= 4) { items.push(new Pistol(playerLevel, qual)); }
  else if (num > 4 && num <= 6) { items.push(new SMG(playerLevel, qual)); }
  else if (num > 6 && num <= 8) { items.push(new AssaultRifle(playerLevel, qual)); }
  else if (num > 8 && num <= 10) { items.push(new SniperRifle(playerLevel, qual)); }
  else if (num > 10 && num <= 12) { items.push(new Shotgun(playerLevel, qual)); }
  else if (num == 13) { items.push(new RocketLauncher(playerLevel, qual)); }
  else if (num > 13 && num <= 15) { items.push(new Grenade(playerLevel, qual)); }
  else { items.push(new Shield(playerLevel, qual)); }
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
    console.log("Quality Roll: " + num);
    if (num <= 12) {
        return "Green";
    } else if ((num > 12) && (num <= 17)) {
        console.log("Quality: Blue");
        return "Blue";
    } else if ((num > 17) && (num <= 19)) {
        console.log("Quality: Purple");
        return "Purple";
    } else {
        console.log("Quality: Orange");
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

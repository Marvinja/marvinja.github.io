var consoleLogStyle = "color: #a0a0a0; font-family: Willowbody";

var quality;
var categorySel, category;
var playerLevelSel, playerLevel;
var playerLevelArr = ["Novice", "Seasoned", "Veteran", "Heroic", "Legendary"];
var itemQualityArr = ["White", "Green", "Blue", "Purple", "Orange"];

var item;
var items = [];

function setup() {
  noCanvas();
}

function Generate() {
  var cat = select("#category").value();
  console.log(`%cGenerating new ${cat}`, `color: #a0a0a0; font-family: Willowbody`);
  playerLevel = select("#playerLevel").value();
  quality = randomQuality();
  console.log(`Generating ${playerLevel} %c${quality}` + ` ${cat}`, `color: ${quality}; font-weight: bold; font-family: Willowbody`);
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
  if (num <= 4) { items.push(new Pistol(pl, qual)); return; }
  if (num > 4 && num <= 6) { items.push(new SMG(pl, qual)); return; }
  if (num > 6 && num <= 8) { items.push(new AssaultRifle(pl, qual)); return; }
  if (num > 8 && num <= 10) { items.push(new SniperRifle(pl, qual)); return; }
  if (num > 10 && num <= 12) { items.push(new Shotgun(pl, qual)); return; }
  if (num == 13) { items.push(new RocketLauncher(pl, qual)); return; }
  if (num > 13 && num <= 15) { items.push(new Grenade(pl, qual)); return; }
  items.push(new Shield(pl, qual));
}

function randomQuality() {
    var num = RollX(20);
    if (num <= 12) { console.log(`Choosing Quality: %cGreen (${num})`, "color: green; font-weight: bold; font-family: Willowbody"); return "Green"; }
    if ((num > 12) && (num <= 17)) { console.log(`Choosing Quality: %cBlue (${num})`, "color: blue; font-weight: bold; font-family: Willowbody"); return "Blue"; }
    if ((num > 17) && (num <= 19)) { console.log(`Choosing Quality: %cPurple (${num})`, "color: purple; font-weight: bold; font-family: Willowbody"); return "Purple"; }
    console.log(`Randomising Quality: %cOrange (${num})`, "color: orange; font-weight: bold; font-family: Willowbody"); return "Orange";
}

function SetHighlight(id) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i].RemoveHTML();
    }
  }
}

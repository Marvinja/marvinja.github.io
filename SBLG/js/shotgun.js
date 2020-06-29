class Shotgun extends Gun {
  constructor(playerLevel, quality) {
    super(playerLevel, quality, "Shotgun");

    this.InitialiseShotgun(this.RollX(20));
    this.InitialiseManufacturer();

    //Improvement Variables
    this.criticalLevel = 1;
    this.critical = this.SetCritical(this.criticalLevel);

    //Improvement Limits;
    this.damageLimit = 0;
    this.rangeLimit = 0;
    this.apLimit = 0;
    for (var i = 0; i < this.improvements; i ++) {
        this.Improvements(this.RollX(20));
    }

    if (this.specialDamageType && !this.elementalSubPrefix) {
      this.AddSubPrefix(this.specialDamageType);
    }
    this.subPrefix = this.SelectSubPrefix();
    this.fullname = `${!this.elementalSubPrefix ? "" : this.elementalSubPrefix} ${this.subPrefix} ${this.prefix}`;

    this.RemoveHTML();
    // this.ConvertToHTML();
    this.AddItemBlock();
  }

  InitialiseShotgun(num) {
      if (num <= 5) { this.model = "Basic"; this.InitialiseBasic(this.RollX(20)); }
      else if (num > 5 && num <= 10) { this.model = "Accurate"; this.InitialiseAccurate(this.RollX(20)); }
      else if (num > 10 && num <= 15) { this.model = "Double-barreled"; this.InitialiseDoubleBarreled(this.RollX(20)); }
      else { this.model = "Triple-Barreled"; this.InitialiseTripleBarreled(this.RollX(20)); }
  }

  InitialiseBasic(num) {
      if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Skatergun"; }
      else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Projectile Diversification"; }
      else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Scattergun"; }
      else if (num > 12 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Home Security"; }
      else { this.manufacturer = "Torgue"; this.prefix = "Bangstick"; }

      this.InitialiseBasicStats();
  }
  InitialiseBasicStats() {
      this.rangeLevel = 3;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 1;
      this.damage = this.SetDamageShotgun(this.damageLevel);
      this.rateOfFire = 1;
      this.clip = this.initialClip = 7;
      this.strength = "-";
      this.ap = 0;
      this.barrels = 1;
      this.aimLevel = 0;
      this.aim = this.SetAim(this.aimLevel);
  }
  InitialiseAccurate(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Longer ragne kilier"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Thinking"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Longrider"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Sportsman"; }
    else { this.manufacturer = "Torgue"; this.prefix = "Stalker"; }

    this.InitialiseAccurateStats();
  }
  InitialiseAccurateStats() {
    this.rangeLevel = 4;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 1;
    this.damage = this.SetDamageShotgun(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 6;
    this.strength = "-";
    this.ap = 0;
    this.barrels = 1;
    this.aimLevel = 1;
    this.aim = this.SetAim(this.aimLevel);
  }
  InitialiseDoubleBarreled(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Stret Sweper"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Face Time"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Coach Gun"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Double Barrels!"; }
    else { this.manufacturer = "Torgue"; this.prefix = "Double Lovin' Pounder"; }

    this.InitialiseDoubleBarreledStats();
  }
  InitialiseDoubleBarreledStats() {
    this.rangeLevel = 2;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 1;
    this.damage = this.SetDamageShotgun(this.damageLevel);
    this.rateOfFire = 2;
    this.clip = this.initialClip = 7;
    this.strength = "-";
    this.ap = 0;
    this.barrels = 2;
    this.aimLevel = 0;
    this.aim = this.SetAim(this.aimLevel);
  }

  InitialiseTripleBarreled(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Room Clener"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Crowdsourcing"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Bushwack"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Triple Barrels!"; }
    else { this.manufacturer = "Torgue"; this.prefix = "Three Way Hulk"; }

    this.InitialiseTripleBarreledStats();
  }
  InitialiseTripleBarreledStats() {
    this.rangeLevel = 2;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 1;
    this.damage = this.SetDamageShotgun(this.damageLevel);
    this.rateOfFire = 3;
    this.clip = this.initialClip = 7;
    this.strength = "-";
    this.ap = 0;
    this.barrels = 3;
    this.aimLevel = 0;
    this.aim = this.SetAim(this.aimLevel);
  }

  InitialiseManufacturer() {
    switch (this.manufacturer) {
      case "Bandit": this.SetBandit(); break;
      case "Hyperion": this.SetHyperion(); break;
      case "Jakobs": this.SetJakobs(); break;
      case "Tediore": this.SetTediore(); break;
      case "Torgue": this.SetTorgue(); break;
      default: console.log("Manufacturer not found"); break;
    }
  }

  Improvements(num) {
      if (num <= 4) {
        if (this.damageLevel < 3) { this.damageLimit ++; this.damageLevel ++; this.damage = this.SetDamageShotgun(this.damageLevel); this.improvementList.push("Damage"); this.AddSubPrefix("Damage"); }
        else if (this.barrels < 4) { this.Improvements(17); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 4 && num <= 6) {
          if (this.rangeLimit < 2) { this.rangeLimit ++; this.rangeLevel ++; this.range = this.SetRange(this.rangeLevel); this.improvementList.push("Range"); this.AddSubPrefix("Range"); }
          else if (this.aimLevel < 1) { this.Improvements(15); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num == 7) {
          if (this.clipLevel < 3) { this.clipLevel ++; this.ImproveClip(this.clipLevel); this.improvementList.push("Clip"); this.AddSubPrefix("Clip"); }
          else if (this.barrels < 4) { this.Improvements(17); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 7 && num <= 9) {
        if(this.criticalLevel < 4) { this.criticalLevel ++; this.critical = this.SetCritical(this.criticalLevel);this.improvementList.push("Critical"); this.AddSubPrefix("Critical"); }
        else if (this.damageLimit < 3) { this.Improvements(1); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 9 && num <= 11) {
        if (!this.specialDamageType) {
          this.InitialiseSpecialDamageType(num); this.improvementList.push(`Initialise Special Damage`);
        } else {
          this.ImproveSpecialDamage(); this.improvementList.push("Special Damage");
        }
      }
      else if (num > 11 && num <= 13) {
        if (!this.specialProperties.includes("Auto Shotgun")) { this.specialProperties.push("Auto Shotgun", "This shotgun can now use the rapid attack manoeuver."); this.improvementList.push("Auto Shotgun"); this.AddSubPrefix("Auto"); }
        else { this.Improvements(7); }
      }
      else if (num > 13 && num <= 15) {
        if (this.aimLevel < 1) { this.aimLevel ++; this.aim = this.SetAim(this.aimLevel); this.improvementList.push("Aim"); this.AddSubPrefix("Aiming"); }
        else if (this.rangeLimit < 2) { this.Improvements(5); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num == 16) {
        if (!this.specialProperties.includes("Rapid Reload")) { this.specialProperties.push("Rapid Reload", "A weapon that receives this Improvement allows its user to ignore any multi-action penalty that may be caused by reloading it."); this.improvementList.push("Rapid Reload"); this.AddSubPrefix("Rapid Reload"); }
        else { this.Improvements(7); }
      }
      else if (num > 16 && num <= 19) {
        if (this.barrels < 4 && this.barrels < this.clip) { this.barrels ++; this.rateOfFire ++; if (!this.specialProperties.includes("Barrels")) { this.specialProperties.push("Barrels", "Multi-barreled shotguns follow the standard rules for shotguns, but all the barrels must be fired at once. A shotgun can never have more barrels than its Clip Capacity."); } this.improvementList.push("Barrels"); this.AddSubPrefix("Barrels"); }
        else if (this.rangeLimit < 2) { this.Improvements(5); }
        else { this.Improvements(this.RollX(20)); }
      }
      else {
        if (this.bayonetLevel < 2) { this.bayonetLevel ++; this.bayonet = this.SetBayonet(this.bayonetLevel); this.improvementList.push("Bayonet"); this.AddSubPrefix("Bayonet"); }
        else { this.Improvements(this.RollX(20)); }
      }
  }

  ImproveSpecialDamage() {
    if (this.specialDamageType == "Corrosive") { if (this.specialDamage < 2) { this.specialDamage ++; } else { this.Improvements(1); }}
    if (this.specialDamageType == "Shock") { if (this.specialDamage < 2) { this.specialDamage ++; } else { this.Improvements(1); }}
    if (this.specialDamageType == "Incendiary") { if (this.incendiaryDamageLevel < 3) { this.incendiaryDamageLevel ++; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); } else { this.Improvements(1); }}
    if (this.specialDamageType == "Slag" || this.specialDamageType == "Explosive") { this.Improvements(1); }
  }

  InitialiseSpecialDamageType(num) {
    if (num <= 12) { this.specialDamageType = "Explosive"; }
    else if (num > 12 && num <= 14) { this.specialDamageType = "Corrosive"; this.specialDamage = 1; this.AddSubPrefix("Corrosive"); }
    else if (num > 14 && num <= 16) { this.specialDamageType = "Shock"; this.specialDamage = 1; this.AddSubPrefix("Shock"); }
    else if (num > 16 && num <= 18) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); this.AddSubPrefix("Incendiary"); }
    else { this.specialDamageType = "Slag"; this.AddSubPrefix("Slag"); }
  }

  ShotgunStatBlock() {
    var notes = [];
    for (var i = 0; i < this.specialProperties.length; i += 2) {
        notes.push(`<b>${this.specialProperties[i]}</b>: ${this.specialProperties[i+1]} <br>`);
    }
    var description = join(notes, " ");
    var imp = join(this.improvementList, " | ");

    return createDiv(
      `
          <h4 class="text-right">${this.playerLevel}</h4>
          <table width="100%" cellpadding="5" >
              <tr>
                  <td colspan="6" align="center"><h3 class="${this.quality.toLowerCase()}">${this.fullname}</h3></td>
              </tr>
              <tr class="stats">
                  <td colspan="2" width="33%" align="center">${this.model}</td>
                  <td colspan="2" width="33%">Damage</td>
                  <td colspan="2" width="33%" align="right">${this.damage}</td>
              </tr>
              <tr class="stats">
                  <td class="gun-category"align="center" rowspan="2" colspan="2" valign="center"><img src="./img/categories/${this.category} ${this.quality}.png" class="img-fluid" width="100"/></td>
                  <td colspan="2">Range</td>
                  <td colspan="2" align="right">${this.range}</td>
              </tr>
              <tr class="stats">
                  <td colspan="2">Rate of Fire</td>
                  <td colspan="2" align="right">${this.rateOfFire}</td>
              </tr>
              <tr class="stats">
                  <td colspan="2" align="center">${!this.specialDamageType ? "None" : this.specialDamageType}</td>
                  <td colspan="2">Clip</td>
                  <td colspan="2" align="right">${this.clip}</td>
              </tr>
              <tr class="stats">
                  <td colspan="2" align="center">${!this.specialDamage ? "-" : this.specialDamage}</td>
                  <td colspan="2">AP</td>
                  <td colspan="2" align="right">${this.ap}</td>
              </tr>
              <tr class="shootingModes stats">
                <td class="${this.shootingMode[0] ? "enabled" : ""}">SA</td>
                <td class="${this.shootingMode[1] ? "enabled" : ""}">3RB</td>
                <td class="${this.shootingMode[2] ? "enabled" : ""}">FA2</td>
                <td class="${this.shootingMode[3] ? "enabled" : ""}">FA3</td>
                <td class="${this.shootingMode[4] ? "enabled" : ""}">FA4</td>
                <td class="${this.shootingMode[5] ? "enabled" : ""}">FA5</td>
              </tr>
              <tr class="shootingModes stats">
                <td colspan="3" class="${this.hinderances[0] ? "enabled" : ""}">Limited Ammo</td>
                <td colspan="3" class="${this.hinderances[1] ? "enabled" : ""}">Low Rate of Fire</td>
              </tr>
              <tr class="shootingModes stats">
                <td colspan="2" class="${this.aimLevel === 1 ? "enabled" : ""}">Zoom</td>
                <td colspan="2" class="enabled">Critical: ${this.critical}</td>
                <td colspan="2" class="enabled">Barrels: ${this.barrels}</td>
              </tr>
              <tr class="shootingModes stats">
                <td colspan="3" class="${this.bayonetLevel === 1 ? "enabled" : ""}">Bayonet (Str + d8)</td>
                <td colspan="3" class="${this.bayonetLevel === 2 ? "enabled" : ""}">Super Bayonet (Str + d10)</td>
              </tr>
              <tr>
                  <td colspan="6">${description}</td>
              </tr>
              <tr>
                  <td align="right" colspan="3" valign="center"><h3 id="improvements" data-toggle="tooltip"  class="text-left ml-2" title="${imp}">Improvements</h3></td>
                  <td align="right" colspan="3" valign="center"><h3 class="text-right green">${this.manufacturer}</h3></td>
              </tr>
          </table>
      `
    );
  }

  ConvertToHTML(){

      var div = this.ShotgunStatBlock();
      div.addClass(`col-md-6 item my-4 item-${this.quality.toLowerCase()}`);
      var inventory = select('#inventory');
      div.parent(inventory);

  }

  RemoveHTML() {
    var inventoryHighlight = document.getElementById('inventory-highlight');
    if (inventoryHighlight.childNodes.length != 1) {
      var removeDiv = select('#item-highlight');
      removeDiv.remove();
    }

    var div = this.ShotgunStatBlock();
    div.addClass(`col-md-12 item my-4 item-${this.quality.toLowerCase()}`);
    div.id(`item-highlight`);

    var inventory = select('#inventory-highlight');
    div.parent(inventory);
  }

  AddSubPrefix(improvement) {
    const manufacturerArr =["Bandit", "Hyperion", "Jakobs", "Tediore", "Torgue"];
    const improvementArr =["Aiming", "Range", "AP", "Damage", "Shooting Mode", "Bayonet", "Clip", "Critical", "Corrosive", "Incendiary", "Shock", "Slag", "Rapid Reload", "Stability"];
    const subPrefixArr =[
        ["Sketer", "Sketer", "Asssault", "Asssault", "Asssault", "Slising", "Drumed", "Critikal Hit", "Crudy", "Fire Fire", "Zapper" , "Slaged", "Quik Loader", "Redy Stedy"], // Bandit
        ["Potential", "Potential", "Practicable", "Practicable", "Practicable", "Restructuring", "Scalable", "Critical", "Industrial", "Clement", "Conductive" , "Negative", "Reactive", "Social"], // Hyperion
        ["Huntin'", "Huntin'", "Rustler's", "Rustler's", "Rustler's", "Barbed", "Sidewinder", "Doc's", "", "", "" , "", "Texas", "Well Kept"], // Jakobs
        ["Original", "Original", "Gentle", "Gentle", "Gentle", "Swiss", "Extra Large", "Royal", "Spring Time", "Sunny", "Blue Light" , "Boosted", "Basic", "New and Improved"], // Tediore
        ["Potent", "Potent", "Casual", "Casual", "Casual", "Bad Touch", "Desperate", "Juicy", "", "", "" , "", "Impetuous", "Sinewy"]  // Torgue

    ];
    if (!["Corrosive", "Incendiary", "Shock", "Slag"].includes(improvement)) {
      this.subPrefixArray.push(subPrefixArr[manufacturerArr.indexOf(this.manufacturer)][improvementArr.indexOf(improvement)]);
    } else {
      this.elementalSubPrefix = subPrefixArr[manufacturerArr.indexOf(this.manufacturer)][improvementArr.indexOf(improvement)];
    }
  }

  SelectSubPrefix() {
    var s_prefix = this.subPrefixArray[int(random()*this.subPrefixArray.length-1)];
    console.log(s_prefix);
    return s_prefix ? s_prefix : "";
  }

} //End

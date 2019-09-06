class SniperRifle extends Gun {
  constructor(playerLevel, quality) {
    super(playerLevel, quality, "Sniper Rifle");

    this.InitialiseSniperRifle(this.RollX(20));
    this.InitialiseManufacturer();

    //Improvement Variables
    this.criticalLevel = 1;
    this.critical = this.SetCritical(this.criticalLevel);
    this.aimLevel = 2;
    this.aim = this.SetAim(this.aimLevel);
    this.barrels = 1;
    this.snapfire = -2;

    //Improvement Limits;
    this.damageLimit = 0;
    this.rangeLimit = 0;
    this.apLimit = 0;
    for (var i = 0; i < this.improvements; i ++) {
        this.Improvements(this.RollX(20));
    }

    this.name = `${this.manufacturer} ${this.prefix}`;

    this.RemoveHTML();
    // this.ConvertToHTML();
    this.AddItemBlock();
  }

  InitialiseSniperRifle(num) {
      if (num <= 5) { this.model = "Basic"; this.InitialiseBasic(this.RollX(20)); }
      else if (num > 5 && num <= 10) { this.model = "Extended Range"; this.InitialiseExtendedRange(this.RollX(20)); }
      else if (num > 10 && num <= 15) { this.model = "Armor-piercing"; this.InitialiseArmorPiercing(this.RollX(20)); }
      else { this.model = "Semi-automatic"; this.InitialiseSemiAutomatic(this.RollX(20)); }
  }

  InitialiseBasic(num) {
      if (num <= 4) { this.manufacturer = "Dahl"; this.prefix = "Sniper"; }
      else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Sniper Rifle"; }
      else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Callipeen"; }
      else if (num > 12 && num <= 16) { this.manufacturer = "Maliwan"; this.prefix = "Snider"; }
      else { this.manufacturer = "Vladof"; this.prefix = "Pooshka"; }

      this.InitialiseBasicStats();
  }
  InitialiseBasicStats() {
      this.rangeLevel = 10;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 6;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 1;
      this.clip = this.initialClip = 8;
      this.strength = "d6";
      this.ap = 2;
      this.shootingModeLevel = 0;
  }
  InitialiseExtendedRange(num) {
    if (num <= 4) { this.manufacturer = "Dahl"; this.prefix = "Strike"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Transaction"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Chinook"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Maliwan"; this.prefix = "Jericho"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Bratchny"; }

    this.InitialiseExtendedRangeStats();
  }
  InitialiseExtendedRangeStats() {
    this.rangeLevel = 11;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 6;
    this.damage = this.SetDamage(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 8;
    this.strength = "d6";
    this.ap = 2;
    this.shootingModeLevel = 0;
  }
  InitialiseArmorPiercing(num) {
    if (num <= 4) { this.manufacturer = "Dahl"; this.prefix = "Terror"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Policy"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Muckamuck"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Maliwan"; this.prefix = "Corinthian"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Horrorshow"; }

    this.InitialiseArmorPiercingStats();
  }
  InitialiseArmorPiercingStats() {
    this.rangeLevel = 10;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 6;
    this.damage = this.SetDamage(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 7;
    this.strength = "d8";
    this.ap = 4;
    this.InitialiseSpecialDamageType(17);
    this.shootingModeLevel = 0;
  }

  InitialiseSemiAutomatic(num) {
    if (num <= 4) { this.manufacturer = "Dahl"; this.prefix = "Scoop"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Competition"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Diaub"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Maliwan"; this.prefix = "Rakhell"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Droog"; }

    this.InitialiseSemiAutomaticStats();
  }
  InitialiseSemiAutomaticStats() {
    this.rangeLevel = 9;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 6;
    this.damage = this.SetDamage(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 9;
    this.strength = "d6";
    this.ap = 2;
    this.shootingModeLevel = 1;
    this.AddShootingMode(this.shootingModeLevel);
  }

  InitialiseManufacturer() {
      if (this.manufacturer == "Bandit") { this.SetBandit(); }
      if (this.manufacturer == "Dahl") { this.SetDahl(); }
      if (this.manufacturer == "Jakobs") { this.SetJakobs(); }
      if (this.manufacturer == "Maliwan") { this.SetMaliwan(); }
      if (this.manufacturer == "Tediore") { this.SetTediore(); }
      if (this.manufacturer == "Hyperion") { this.SetHyperion(); }
      if (this.manufacturer == "Torgue") { this.SetTorgue(); }
      if (this.manufacturer == "Vladof") { this.SetVladof(); }
  }

  Improvements(num) {
      if (num <= 2) {
        if (this.damageLimit < 12) { this.damageLimit ++; this.damageLevel ++; this.damage = this.SetDamage(this.damageLevel); this.improvementList.push("Damage"); }
        else if (this.criticalLevel < 4) { this.Improvements(13); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 2 && num <= 4) {
          if (this.rangeLevel < 11) { this.rangeLimit ++; this.rangeLevel ++; this.range = this.SetRange(this.rangeLevel); this.improvementList.push("Range"); }
          else if (this.criticalLevel < 4) { this.Improvements(13); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 4 && num <= 6) {
          if (this.clipLevel < 1) { this.clipLevel ++; this.ImproveClip(this.clipLevel); this.improvementList.push("Clip");}
          else if (this.ShootingModeLevel < 2) { this.Improvements(18); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 6 && num <= 8) {
        if(this.apLimit < 4) { this.ap ++; this.improvementList.push("AP"); }
        else if (this.damageLimit < 2) { this.Improvements(9); }
        else if (this.criticalDamage < 4) { this.Improvements(3); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 8 && num <= 10) {
        if (!this.specialDamageType) {
          this.InitialiseSpecialDamageType(num); this.improvementList.push(`Initialise Special Damage`);
        } else {
          this.ImproveSpecialDamage(); this.improvementList.push("Special Damage");
        }
      }
      else if (num > 10 && num <= 12) {
        if (this.snapfire < 0) { this.snapfire ++; this.improvementList.push("Snapfire Penalty");}
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 12 && num <= 17) {
        if (this.criticalLevel < 4) { this.criticalLevel ++; this.critical = this.SetCritical(this.criticalLevel); this.improvementList.push("Critical"); }
        else if (this.rangeLimit < 2) { this.Improvements(3); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 17 && num <= 19) {
        if (this.shootingModeLevel < 2 || this.manufacturer != "Jakobs") {
          this.shootingModeLevel ++;
          if (this.shootingMode[this.shootingModeLevel-1] != null) {
            this.shootingModeLevel ++;
          }
          this.AddShootingMode(this.shootingModeLevel);
          this.improvementList.push("Shooting Mode");
        } else if (this.clipLevel < 1) { this.Improvements(5); }
        else { this.Improvements(this.RollX(20)); }
      }
      else {
        if (this.bayonetLevel < 2) { this.bayonetLevel ++; this.bayonet = this.SetBayonet(this.bayonetLevel); this.improvementList.push("Bayonet"); }
        else { this.Improvements(this.RollX(20)); }
      }
  }

  ImproveSpecialDamage() {
    if (this.specialDamageType == "Corrosive") { if (this.specialDamage < 4) { this.specialDamage ++; } else { this.Improvements(7); }}
    if (this.specialDamageType == "Shock") { if (this.specialDamage < 4) { this.specialDamage ++; } else { this.Improvements(1); }}
    if (this.specialDamageType == "Incendiary") { if (this.incendiaryDamageLevel < 3) { this.incendiaryDamageLevel ++; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); } else { this.Improvements(7); }}
    if (this.specialDamageType == "Slag") { this.Improvements(1); }
    if (this.specialProperties.includes("Heavy Weapon")) { this.Improvements(7); }
  }

  InitialiseSpecialDamageType(num) {
    if (num <= 4) { this.specialDamageType = "Corrosive"; this.specialDamage = 1;}
    else if (num > 4 && num <= 8) { this.specialDamageType = "Shock"; this.specialDamage = 1; }
    else if (num > 8 && num <= 12) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); }
    else if (num > 12 && num <= 16) { this.specialDamageType = "Slag"; }
    else { this.specialProperties.push("Heavy Weapon", "This weapon can deal damage to vehicles and other devices with heavy armor.") }
  }

  SniperRifleStatBlock() {
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
                  <td colspan="6" align="center"><h3 class="${this.quality.toLowerCase()}">${this.name}</h3></td>
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
                <td colspan="2" class="${this.aimLevel === 2 ? "enabled" : ""}">Scope (+2 hit)</td>
                <td colspan="2" class="enabled">Critical: ${this.critical}</td>
                <td colspan="2" class="enabled">Snapfire: ${this.snapfire}</td>
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
      var div = this.SniperRifleStatBlock();
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

    var div = this.SniperRifleStatBlock();
    div.addClass(`col-md-12 item my-4 item-${this.quality.toLowerCase()}`);
    div.id(`item-highlight`);
    var inventory = select('#inventory-highlight');
    div.parent(inventory);
  }

} //End

class AssaultRifle extends Gun {
  constructor(playerLevel, quality) {
    super(playerLevel, quality, "Assault Rifle");

    this.InitialiseAssaultRifle(this.RollX(20));
    this.InitialiseManufacturer();

    //Improvement Variables
    this.aimLevel = 0;
    this.aim = this.SetAim(this.aimLevel);
    this.barrels = 1;

    //Improvement Limits;
    this.damageLimit = 0;
    this.rangeLimit = 0;
    this.apLimit = 0;
    for (var i = 0; i < this.improvements; i ++) {
        this.Improvements(this.RollX(20));
    }

    this.fullname = `${this.manufacturer} ${this.prefix}`;

    this.RemoveHTML();
    // this.ConvertToHTML();
    this.AddItemBlock();
  }

  InitialiseAssaultRifle(num) {
      if (num <= 4) { this.model = "AssaultRifle"; this.InitialiseAR(this.RollX(20)); }
      else if (num > 4 && num <= 8) { this.model = "Scoped Assault Rifle"; this.InitialiseScopedAssaultRifle(this.RollX(20)); }
      else if (num > 8 && num <= 12) { this.model = "Heavy Assault Rifle"; this.InitialiseHeavyAssaultRifle(this.RollX(20)); }
      else if (num > 12 && num <= 16) { this.model = "Machinegun"; this.InitialiseMachinegun(this.RollX(20)); }
      else { this.model = "Grenade Launcher"; this.InitialiseGrenadeLauncher(this.RollX(20)); }
  }

  InitialiseAR(num) {
      if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Mashine Gun"; }
      else if (num > 4 && num <= 8) { this.manufacturer = "Dahl"; this.prefix = "Rifle"; }
      else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Rifle"; }
      else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Rifle"; }
      else { this.manufacturer = "Vladof"; this.prefix = "Rifle"; }

      this.InitialiseARStats();
  }
  InitialiseARStats() {
      this.rangeLevel = 8;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 3;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 2;
      this.clip = this.initialClip = 22;
      this.strength = "-";
      this.ap  = 1;

      this.aimLevel = 0;
      this.shootingModeLevel = 1;
      this.AddShootingMode(1);
      this.AddShootingMode(3);
  }
  InitialiseScopedAssaultRifle(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Carbene"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Dahl"; this.prefix = "Carbine"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Scarab"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Root"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Renegade"; }

      this.InitialiseScopedAssaultRifleStats();
  }
  InitialiseScopedAssaultRifleStats() {
    this.rangeLevel = 8;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 2;
    this.damage = this.SetDamage(this.damageLevel);
    this.rateOfFire = 2;
    this.clip = this.initialClip = 22;
    this.strength = "-";
    this.ap  = 1;

    this.aimLevel = 1;
    this.aim = this.SetAim(this.aimLevel);
    this.shootingModeLevel = 1;
    this.AddShootingMode(1);
    this.AddShootingMode(3);
  }
  InitialiseHeavyAssaultRifle(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Ass Beeter!"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Dahl"; this.prefix = "Defender"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Rifle"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Lance"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Guerilla"; }

      this.InitialiseHeavyAssaultRifleStats();
  }
  InitialiseHeavyAssaultRifleStats() {
    this.rangeLevel = 9;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 3;
    this.damage = this.SetDamage(this.damageLevel);
    this.rateOfFire = 2;
    this.clip = this.initialClip = 20;
    this.strength = "d6";
    this.ap = 2;

    this.aimLevel = 0;
    this.shootingModeLevel = 1;
    this.AddShootingMode(1);
    this.AddShootingMode(3);
  }

  InitialiseMachinegun(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Spinigun"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Dahl"; this.prefix = "Minigun"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Gatling Gun"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Spitter"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Spinigun"; }

      this.InitialiseMachinegunStats();
  }
  InitialiseMachinegunStats() {
    this.rangeLevel = 8;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 3;
    this.damage = this.SetDamage(this.damageLevel);
    this.rateOfFire = 3;
    this.clip = this.initialClip = 27;
    this.strength = "d8";
    this.ap = 1;

    this.aimLevel = 0;
    this.shootingModeLevel = 4;
    this.AddShootingMode(4);
  }

  InitialiseGrenadeLauncher(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Rokets!"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Dahl"; this.prefix = "Grenadier"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Jakobs"; this.prefix = "Cannon"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Torpedo"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Rocketeer"; }

      this.InitialiseGrenadeLauncherStats();
  }
  InitialiseGrenadeLauncherStats() {
    this.rangeLevel = 8;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 1;
    this.damage = this.SetDamageGrenade(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 24;
    this.strength = "d8";
    this.ap = 0;

    this.aimLevel = 0;
    this.shootingModeLevel = 0;
    this.specialProperties.push("Grenade Launcher", "The Grenade launcher uses 3 ammo per shot and deals damage in a Small Burst Template.");
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
        if (this.model !== "Grenade Launcher") {
          if (this.damageLimit < 12) { this.damageLimit ++; this.damageLevel ++; this.damage = this.SetDamage(this.damageLevel); this.improvementList.push("Damage"); }
          else if (this.ShootingModeLevel < 5) { this.Improvements(17); }
          else { this.Improvements(this.RollX(20)); }
        } else {
          if (this.damageLimit < 7) { this.damageLimit ++; this.damageLevel ++; this.damage = this.SetDamageGrenade(this.damageLevel); this.improvementList.push("Damage"); }
          else if (this.ShootingModeLevel < 5) { this.Improvements(17); }
          else { this.Improvements(this.RollX(20)); }
        }
      }
      else if (num > 2 && num <= 4) {
          if (this.rangeLimit < 3) { this.rangeLimit ++; this.rangeLevel ++; this.range = this.SetRange(this.rangeLevel); this.improvementList.push("Range"); }
          else if (this.aimLevel < 2) { this.Improvements(15); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 4 && num <= 6) {
          if (this.clipLevel < 3) { this.clipLevel ++; this.ImproveClip(this.clipLevel); this.improvementList.push("Clip");}
          else if (this.ShootingModeCount() < 6) { this.Improvements(17); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 6 && num <= 10) {
        if(this.apLimit < 2) { this.ap ++; this.improvementList.push("AP"); }
        else if (this.damageLimit < 2) { this.Improvements(1); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 10 && num <= 12) {
        if (!this.specialDamageType) {
          this.InitialiseSpecialDamageType(num); this.improvementList.push(`Initialise Special Damage`);
        } else {
          this.ImproveSpecialDamage();
        }
      }
      else if (num > 12 && num <= 14) {
        if (!this.specialProperties.includes("Stability")) { this.specialProperties.push("Stability", "This Improvement improves the accuracy of weapons when firing rapidly."); this.improvementList.push("Stability");}
        else { this.Improvements(3); }
      }
      else if (num > 14 && num <= 16) {
        if (this.aimLevel < 2) { this.aimLevel ++; this.aim = this.SetAim(this.aimLevel); this.improvementList.push("Aim"); }
        else if (this.rangeLimit < 3) { this.Improvements(3); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 16 && num <= 18) {
        if (this.shootingModeLevel < 5 || this.manufacturer != "Jakobs") {
          this.shootingModeLevel ++;
          if (this.shootingMode[this.shootingModeLevel-1] != null) {
            this.shootingModeLevel ++;
          }
          this.AddShootingMode(this.shootingModeLevel);
          this.improvementList.push("Shooting Mode");
        } else if (this.clipLevel < 3) { this.Improvements(5); }
        else { this.Improvements(this.RollX(20)); }
      } else if (num == 19) {
          if (this.barrels < 2) { this.barrels ++; this.improvementList.push("Barrels"); }
          else { this.Improvements(1); }
          if (!this.specialProperties.includes("Barrels")) { this.specialProperties.push("Barrels", "Each damage roll gets a +1 bonus. The number of ammo spent per shot is doubled. These effects are cumulative with any shooting mode the weapon may have."); }
      } else {
          if (this.bayonetLevel < 2) { this.bayonetLevel ++; this.bayonet = this.SetBayonet(this.bayonetLevel); this.improvementList.push("Bayonet"); }
          else { this.Improvements(this.RollX(20)); }
      }
  }

  ImproveSpecialDamage() {
    if (this.specialDamageType == "Corrosive") { if (this.specialDamage < 3) { this.specialDamage ++; this.improvementList.push("Special Damage"); } else { this.Improvements(7); }}
    if (this.specialDamageType == "Shock") { if (this.specialDamage < 3) { this.specialDamage ++; this.improvementList.push("Special Damage"); } else { this.Improvements(1); }}
    if (this.specialDamageType == "Incendiary") { if (this.incendiaryDamageLevel < 3) { this.incendiaryDamageLevel ++; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); this.improvementList.push("Special Damage"); } else { this.Improvements(7); }}
    if (this.specialDamageType == "Slag" || this.specialDamageType == "Explosive" || this.specialProperties.includes("Heavy Weapon")) { this.Improvements(1); }
  }

  InitialiseSpecialDamageType(num) {
    if (num <= 4) { this.specialDamageType = "Corrosive"; this.specialDamage = 1;}
    else if (num > 4 && num <= 8) { this.specialDamageType = "Shock"; this.specialDamage = 1; }
    else if (num > 8 && num <= 12) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); }
    else if (num > 12 && num <= 14) { this.specialDamageType = "Slag"; }
    else if (num > 14 && num <= 18) { this.specialDamageType = "Explosive"; }
    else { this.specialProperties.push("Heavy Weapon", "This weapon can deal damage to vehicles and other devices with heavy armor.") }
  }

  AssaultRifleStatBlock() {
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
                <td colspan="3" class="enabled">${this.aimLevel > 0 ? this.aim : "No Scope"}</td>
                <td colspan="3" class="enabled">Barrels: ${this.barrels}</td>
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
      var div = this.AssaultRifleStatBlock();
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

    var div = this.AssaultRifleStatBlock();
    div.addClass(`col-md-12 item my-4 item-${this.quality.toLowerCase()}`);
    div.id(`item-highlight`);
    var inventory = select('#inventory-highlight');
    div.parent(inventory);
  }

} //End

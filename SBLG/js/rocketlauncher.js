class RocketLauncher extends Gun {
  constructor(playerLevel, quality) {
    super(playerLevel, quality, "Rocket Launcher");

    this.InitialiseRocketLauncher(this.RollX(20));

    //Universal Rocket Intialisers
    this.barrels = 1;
    this.specialProperties.push("Heavy Weapon", "This weapon can deal damage to vehicles and other devices with heavy armor.")
    this.specialProperties.push("Rockets", "Unless specified otherwise, damage is dealt in a Medium Burst Template. Targets can try to dive for cover by making an Agility test at -2. If they want to do this, their Pace must allow them to get out of the Burst Template.");

    this.InitialiseManufacturer();

    //Improvement Variables
    this.snapfire = -2;

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

  InitialiseRocketLauncher(num) {
      if (num <= 5) { this.model = "Basic"; this.InitialiseBasic(this.RollX(20)); }
      else if (num > 5 && num <= 10) { this.model = "Basic 2"; this.InitialiseBasic2(this.RollX(20)); }
      else if (num > 10 && num <= 15) { this.model = "Powerful"; this.InitialisePowerful(this.RollX(20)); }
      else { this.model = "Accurate"; this.InitialiseAccurate(this.RollX(20)); }
  }

  InitialiseBasic(num) {
      if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Launcher"; }
      else if (num > 4 && num <= 8) { this.manufacturer = "Maliwan"; this.prefix = "Projectile"; }
      else if (num > 8 && num <= 12) { this.manufacturer = "Tediore"; this.prefix = "Launcher"; }
      else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Boom"; }
      else { this.manufacturer = "Vladof"; this.prefix = "RPG"; }

      this.InitialiseBasicStats();
  }
  InitialiseBasicStats() {
      this.rangeLevel = 8;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 2;
      this.damage = this.SetDamageRocket(this.damageLevel);
      this.rateOfFire = 1;
      this.clip = this.initialClip = 3;
      this.strength = "d6";
      this.ap = 10;
      this.aimLevel = 1;
      this.specialProperties.push("Full turn to reload", "Reloading the Rocket Launcher takes a full round, during which the character can’t make another action or move at all.");
  }
  InitialiseBasic2(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Bombabarbardeer"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Maliwan"; this.prefix = "Prowler"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Tediore"; this.prefix = "Dispatch"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Dee"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Vanquisher"; }

    this.InitialiseBasic2Stats();
  }
  InitialiseBasic2Stats() {
    this.rangeLevel = 8;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 2;
    this.damage = this.SetDamageRocket(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 4;
    this.strength = "d6";
    this.ap = 10;
    this.aimLevel = 1;
    this.specialProperties.push("Full turn to reload", "Reloading the Rocket Launcher takes a full round, during which the character can’t make another action or move at all.");
  }
  InitialisePowerful(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Zooka!"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Maliwan"; this.prefix = "Punishment"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Tediore"; this.prefix = "Bazooka"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Duuurp!"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Hero"; }

    this.InitialisePowerfulStats();
  }
  InitialisePowerfulStats() {
    this.rangeLevel = 8;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 4;
    this.damage = this.SetDamageRocket(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 3;
    this.strength = "d8";
    this.ap = 15;
    this.aimLevel = 0;
    this.specialProperties.push("Two full turns to reload", "Reloading the Rocket Launcher takes two full rounds, during which the character can’t make another action or move at all.");
  }

  InitialiseAccurate(num) {
    if (num <= 4) { this.manufacturer = "Bandit"; this.prefix = "area efect"; }
    else if (num > 4 && num <= 8) { this.manufacturer = "Maliwan"; this.prefix = "Panorama"; }
    else if (num > 8 && num <= 12) { this.manufacturer = "Tediore"; this.prefix = "Spread"; }
    else if (num > 12 && num <= 16) { this.manufacturer = "Torgue"; this.prefix = "Blaa"; }
    else { this.manufacturer = "Vladof"; this.prefix = "Glory"; }

    this.InitialiseAccurateStats();
  }
  InitialiseAccurateStats() {
    this.rangeLevel = 8;
    this.range = this.SetRange(this.rangeLevel);
    this.damageLevel = 2;
    this.damage = this.SetDamageRocket(this.damageLevel);
    this.rateOfFire = 1;
    this.clip = this.initialClip = 3;
    this.strength = "d6";
    this.ap = 10;
    this.specialProperties.push("Full turn to reload", "Reloading the Rocket Launcher takes a full round, during which the character can’t make another action or move at all.");
    this.aimLevel = 1;
    this.aim = this.SetAim(this.aimLevel);
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
      if (num <= 4) {
        if (this.damageLimit < 1) { this.damageLimit ++; this.damageLevel ++; this.damage = this.SetDamageRocket(this.damageLevel); this.improvementList.push("Damage"); this.AddSubPrefix("Damage"); }
        else if (this.bayonetLevel < 2) { this.Improvements(20); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 4 && num <= 6) {
          if (this.rangeLimit < 2) { this.rangeLimit ++; this.rangeLevel ++; this.range = this.SetRange(this.rangeLevel); this.improvementList.push("Range"); this.AddSubPrefix("Range"); }
          else if ((this.specialDamageType == "Corrosive" && this.specialDamage < 1) || (this.specialDamageType == "Shock" && this.specialDamage < 2) || (this.specialDamageType == "Incendiary" && this.incendiaryDamageLevel < 2) || (this.specialDamageType == "Slag")) { this.Improvements(11); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 6 && num <= 8) {
          if (this.clipLevel < 1) { this.clipLevel ++; this.ImproveClip(this.clipLevel); this.improvementList.push("Clip"); this.AddSubPrefix("Clip"); }
          else if (this.aimLevel < 2) { this.Improvements(13); }
          else if (this.barrels < 2) { this.Improvements(17); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 8 && num <= 12) {
        if (!this.specialDamageType) {
          this.InitialiseSpecialDamageType(num); this.improvementList.push(`Initialise Special Damage`);
        } else {
          this.ImproveSpecialDamage(); this.improvementList.push("Special Damage");
        }
      }
      else if (num > 12 && num <= 16) {
        if (this.aimLevel < 2) { this.aimLevel ++; this.aim = this.SetAim(this.aimLevel); this.improvementList.push("Aim"); this.AddSubPrefix("Aiming"); }
        else if (this.rangeLimit < 2) { this.Improvements(5); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 16 && num <= 19) {
        if (this.barrels < 2) { this.barrels ++; if (!this.specialProperties.includes("Barrels")) { this.specialProperties.push("Barrels", "Each damage roll gets a +1 bonus. The number of ammo spent per shot is doubled. These effects are cumulative with any shooting mode the weapon may have."); } this.improvementList.push("Barrels"); }
      }
      else {
        if (this.bayonetLevel < 2) { this.bayonetLevel ++; this.bayonet = this.SetBayonet(this.bayonetLevel); this.improvementList.push("Bayonet"); this.AddSubPrefix("Bayonet"); }
        else { this.Improvements(this.RollX(20)); }
      }
  }

  ImproveSpecialDamage() {
    if (this.specialDamageType == "Corrosive") { if (this.specialDamage < 1) { this.specialDamage ++; } else { this.Improvements(1); }}
    if (this.specialDamageType == "Shock") { if (this.specialDamage < 2) { this.specialDamage ++; } else { this.Improvements(1); }}
    if (this.specialDamageType == "Incendiary") { if (this.incendiaryDamageLevel < 3) { this.incendiaryDamageLevel ++; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); } else { this.Improvements(1); }}
    if (this.specialDamageType == "Slag") { this.Improvements(1); }
  }

  InitialiseSpecialDamageType(num) {
    if (num <= 5) { this.specialDamageType = "Corrosive"; this.AddSubPrefix("Corrosive"); }
    else if (num > 5 && num <= 10) { this.specialDamageType = "Shock"; this.specialDamage = 1; this.AddSubPrefix("Shock"); }
    else if (num > 10 && num <= 15) { this.specialDamageType = "Incendiary"; this.specialDamage = 1; this.AddSubPrefix("Incendiary"); }
    else { this.specialDamageType = "Slag"; this.AddSubPrefix("Slag"); }
  }

  RocketLauncherStatBlock() {
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
                  <td colspan="2" width="33%" align="right">${this.damage}${this.barrels > 1 ? `+${this.barrels-1}`: ``}</td>
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
                <td colspan="2" class="${this.aimLevel > 0? "enabled" : "No Scope"}">${this.aim}</td>
                <td colspan="2" class="enabled">Snapfire: ${this.snapfire}</td>
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
      var div = this.RocketLauncherStatBlock();
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

    var div = this.RocketLauncherStatBlock();
    div.addClass(`col-md-12 item my-4 item-${this.quality.toLowerCase()}`);
    div.id(`item-highlight`);

    var inventory = select('#inventory-highlight');
    div.parent(inventory);
  }

  AddSubPrefix(improvement) {
    if (["Aiming", "Range"].indexOf(improvement) >= 0) {
      if (this.manufacturer == "Bandit") { this.subPrefixArray.push("Snyper"); }
      if (this.manufacturer == "Maliwan") { this.subPrefixArray.push("Pertinent"); }
      if (this.manufacturer == "Tediore") { this.subPrefixArray.push("Ultraprecise"); }
      if (this.manufacturer == "Torgue") { this.subPrefixArray.push("gaa dunk ga"); }
      if (this.manufacturer == "Vladof") { this.subPrefixArray.push("Victorious"); }
    } else if (improvement == "Bayonet") {
      if (this.manufacturer == "Bandit") { this.subPrefixArray.push("gratutius"); }
      if (this.manufacturer == "Maliwan") { this.subPrefixArray.push("Proximate"); }
      if (this.manufacturer == "Tediore") { this.subPrefixArray.push("Multi-Use"); }
      if (this.manufacturer == "Torgue") { this.subPrefixArray.push("pokee doke"); }
      if (this.manufacturer == "Vladof") { this.subPrefixArray.push("Revolt"); }
    } else if (improvement == "Clip") {
      if (this.manufacturer == "Bandit") { this.subPrefixArray.push("Roket Pawket"); }
      if (this.manufacturer == "Maliwan") { this.subPrefixArray.push("Plentious"); }
      if (this.manufacturer == "Tediore") { this.subPrefixArray.push("Bonus"); }
      if (this.manufacturer == "Torgue") { this.subPrefixArray.push("Deep a"); }
      if (this.manufacturer == "Vladof") { this.subPrefixArray.push("Worker's"); }
    } else if (improvement == "Damage") {
      if (this.manufacturer == "Bandit") { this.subPrefixArray.push("Big"); }
      if (this.manufacturer == "Maliwan") { this.subPrefixArray.push("Puissant"); }
      if (this.manufacturer == "Tediore") { this.subPrefixArray.push("Large"); }
      if (this.manufacturer == "Torgue") { this.subPrefixArray.push("derp"); }
      if (this.manufacturer == "Vladof") { this.subPrefixArray.push("Rugged"); }
    } else if (improvement == "Corrosive") {
      if (this.manufacturer == "Bandit") { this.elementalSubPrefix = "corodoc"; }
      if (this.manufacturer == "Maliwan") { this.elementalSubPrefix = "Paraquat"; }
      if (this.manufacturer == "Tediore") { this.elementalSubPrefix = "Fungicide"; }
      if (this.manufacturer == "Vladof") { this.elementalSubPrefix = "Virulent"; }
    } else if (improvement == "Incendiary") {
      if (this.manufacturer == "Bandit") { this.elementalSubPrefix = "Hunka burning"; }
      if (this.manufacturer == "Maliwan") { this.elementalSubPrefix = "Pyroclastic"; }
      if (this.manufacturer == "Tediore") { this.elementalSubPrefix = "Toasty"; }
      if (this.manufacturer == "Vladof") { this.elementalSubPrefix = "Red"; }
    } else if (improvement == "Shock") {
      if (this.manufacturer == "Bandit") { this.elementalSubPrefix = "Shoky"; }
      if (this.manufacturer == "Maliwan") { this.elementalSubPrefix = "Paraelectronomic"; }
      if (this.manufacturer == "Tediore") { this.elementalSubPrefix = "Sparking"; }
      if (this.manufacturer == "Vladof") { this.elementalSubPrefix = "Shock"; }
    } else if (improvement == "Slag") {
      if (this.manufacturer == "Bandit") { this.elementalSubPrefix = "Slaged"; }
      if (this.manufacturer == "Maliwan") { this.elementalSubPrefix = "Purulence"; }
      if (this.manufacturer == "Tediore") { this.elementalSubPrefix = "Disinfecting"; }
      if (this.manufacturer == "Vladof") { this.elementalSubPrefix = "Opposing"; }
    } else if (improvement == "Range") {
      if (this.manufacturer == "Bandit") { this.subPrefixArray.push("Speeedee"); }
      if (this.manufacturer == "Maliwan") { this.subPrefixArray.push("Punitory"); }
      if (this.manufacturer == "Tediore") { this.subPrefixArray.push("Rocket Speed"); }
      if (this.manufacturer == "Torgue") { this.subPrefixArray.push("Fidle Dee"); }
      if (this.manufacturer == "Vladof") { this.subPrefixArray.push("Partisan"); }
    } else {
      if (this.manufacturer == "Bandit") { this.subPrefixArray.push("Rappid"); }
      if (this.manufacturer == "Maliwan") { this.subPrefixArray.push("Predacious"); }
      if (this.manufacturer == "Tediore") { this.subPrefixArray.push("Bustling"); }
      if (this.manufacturer == "Torgue") { this.subPrefixArray.push("dumpa"); }
      if (this.manufacturer == "Vladof") { this.subPrefixArray.push("Turbulent"); }
    }
  }

  SelectSubPrefix() {
    var s_prefix = this.subPrefixArray[int(random()*this.subPrefixArray.length-1)];
    console.log(s_prefix);
    return s_prefix ? s_prefix : "";
  }

} //End

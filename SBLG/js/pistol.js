class Pistol extends Gun {
  constructor(playerLevel, quality) {
    super(playerLevel, quality, "Pistol");

    this.InitialisePistol(this.RollX(20));
    this.SetManufacturer(this.manufacturer);
    //Improvement Variables
    this.aimLevel = 0;
    this.aim = this.SetAim(this.aimLevel);
    this.barrels = 1;
    this.shootingModeLevel = 1;
    this.AddShootingMode(this.shootingModeLevel);
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

  InitialisePistol(num) {
      if (num <=4) { this.model = "Handgun"; this.InitialiseHandgun(this.RollX(20)); }
      else if (num > 4 && num <= 8) { this.model = "Aimshot"; this.InitialiseAimshot(this.RollX(20)); }
      else if (num > 8 && num <= 12) { this.model = "Powershot"; this.InitialisePowershot(this.RollX(20)); }
      else if (num > 4 && num <= 16) { this.model = "Big Gun"; this.InitialiseBigGun(this.RollX(20)); }
      else { this.model = "Quickshot"; this.InitialiseQuickshot(this.RollX(20)); }
  }

  InitialiseHandgun(num) {
      if (num <= 3) { this.manufacturer = "Bandit"; this.prefix = "Pistal"; }
      else if (num > 3 && num <= 6) { this.manufacturer = "Dahl"; this.prefix = "Repeater"; }
      else if (num > 6 && num <= 9) { this.manufacturer = "Hyperion"; this.prefix = "Apparatus"; }
      else if (num > 9 && num <= 11) { this.manufacturer = "Jakobs"; this.prefix = "Revolver"; }
      else if (num > 11 && num <= 13) { this.manufacturer = "Maliwan"; this.prefix = "Aegis"; }
      else if (num > 13 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Handgun"; }
      else if (num > 16 && num <= 18) { this.manufacturer = "Torgue"; this.prefix = "Hand Cannon"; }
      else { this.manufacturer = "Vladof"; this.prefix = "TMP"; }

      this.InitialiseHandgunStats();
  }
  InitialiseHandgunStats() {
      this.rangeLevel = 4;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 4;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 1;
      this.clip = this.initialClip = 16;
      this.strength = "-"
      this.ap  = 0;
  }
  InitialiseAimshot(num) {
      if (num <= 3) { this.manufacturer = "Bandit"; this.prefix = "Hed Shoter!"; }
      else if (num > 3 && num <= 6) { this.manufacturer = "Dahl"; this.prefix = "Anaconda"; }
      else if (num > 6 && num <= 9) { this.manufacturer = "Hyperion"; this.prefix = "Vision"; }
      else if (num > 9 && num <= 11) { this.manufacturer = "Jakobs"; this.prefix = "Longarm"; }
      else if (num > 11 && num <= 13) { this.manufacturer = "Maliwan"; this.prefix = "Phobia"; }
      else if (num > 13 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Aimshot"; }
      else if (num > 16 && num <= 18) { this.manufacturer = "Torgue"; this.prefix = "Hole Puncher"; }
      else { this.manufacturer = "Vladof"; this.prefix = "Assassin"; }

      this.InitialiseAimshotStats();
  }
  InitialiseAimshotStats() {
      this.rangeLevel = 6;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 4;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 1;
      this.clip = this.initialClip = 13;
      this.strength = "-"
      this.ap  = 0;
  }
  InitialisePowershot(num) {
      if (num <= 3) { this.manufacturer = "Bandit"; this.prefix = "Ass Beeter"; }
      else if (num > 3 && num <= 6) { this.manufacturer = "Dahl"; this.prefix = "Peacemaker"; }
      else if (num > 6 && num <= 9) { this.manufacturer = "Hyperion"; this.prefix = "Leverage"; }
      else if (num > 9 && num <= 11) { this.manufacturer = "Jakobs"; this.prefix = "Iron"; }
      else if (num > 11 && num <= 13) { this.manufacturer = "Maliwan"; this.prefix = "Torment"; }
      else if (num > 13 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Powershot"; }
      else if (num > 16 && num <= 18) { this.manufacturer = "Torgue"; this.prefix = "Rod"; }
      else { this.manufacturer = "Vladof"; this.prefix = "Fighter"; }

      this.InitialisePowershotStats();
  }
  InitialisePowershotStats() {
      this.rangeLevel = 5;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 5;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 1;
      this.clip = this.initialClip = 12;
      this.strength = "d6"
      this.ap  = 1;
  }
  InitialiseBigGun(num) {
      if (num <= 3) { this.manufacturer = "Bandit"; this.prefix = "Magamum!"; }
      else if (num > 3 && num <= 6) { this.manufacturer = "Dahl"; this.prefix = "Magnum"; }
      else if (num > 6 && num <= 9) { this.manufacturer = "Hyperion"; this.prefix = "Impact"; }
      else if (num > 9 && num <= 11) { this.manufacturer = "Jakobs"; this.prefix = "Widow Maker"; }
      else if (num > 11 && num <= 13) { this.manufacturer = "Maliwan"; this.prefix = "Animosity"; }
      else if (num > 13 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Biggun"; }
      else if (num > 16 && num <= 18) { this.manufacturer = "Torgue"; this.prefix = "Slapper"; }
      else { this.manufacturer = "Vladof"; this.prefix = "Troublemaker"; }

      this.InitialiseBigGunStats();
  }
  InitialiseBigGunStats() {
      this.rangeLevel = 4;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 5;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 1;
      this.clip = this.initialClip = 14;
      this.strength = "-"
      this.ap  = 1;
  }
  InitialiseQuickshot(num) {
      if (num <= 3) { this.manufacturer = "Bandit"; this.prefix = "Ratatater!"; }
      else if (num > 3 && num <= 6) { this.manufacturer = "Dahl"; this.prefix = "Negotiator"; }
      else if (num > 6 && num <= 9) { this.manufacturer = "Hyperion"; this.prefix = "Synergy"; }
      else if (num > 9 && num <= 11) { this.manufacturer = "Jakobs"; this.prefix = "Wheelgun"; }
      else if (num > 11 && num <= 13) { this.manufacturer = "Maliwan"; this.prefix = "Umbrage"; }
      else if (num > 13 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Quickshot"; }
      else if (num > 16 && num <= 18) { this.manufacturer = "Torgue"; this.prefix = "Injector"; }
      else { this.manufacturer = "Vladof"; this.prefix = "Anarchist"; }

      this.InitialiseQuickshotStats();
  }
  InitialiseQuickshotStats() {
      this.rangeLevel = 4;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 3;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 3;
      this.clip = this.initialClip = 18;
      this.strength = "-"
      this.ap  = 0;
      this.AddShootingMode(4);
  }

  Improvements(num) {
      if (num <=3) {
          if (this.damageLimit < 2) { this.damageLimit ++; this.damageLevel ++; this.damage = this.SetDamage(this.damageLevel); this.improvementList.push("Damage"); this.AddSubPrefix("Damage");}
          else if (this.apLimit < 2) { this.Improvements(8); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 3 && num <= 5) {
          if (this.rangeLimit < 2) { this.rangeLimit ++; this.rangeLevel ++; this.range = this.SetRange(this.rangeLevel); this.improvementList.push("Range"); this.AddSubPrefix("Range"); }
          else if (this.aimLevel < 2) { this.Improvements(14); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 5 && num <= 7) {
          if (this.clipLevel < 3) { this.clipLevel ++; this.ImproveClip(this.clipLevel); this.improvementList.push("Clip"); this.AddSubPrefix("Clip");}
          else if (this.ShootingModeCount() < 6) { this.Improvements(16); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 7 && num <= 9) {
          if(this.apLimit < 2) { this.ap ++; this.improvementList.push("AP"); this.AddSubPrefix("AP");}
          else if (this.damageLimit < 2) { this.Improvements(1); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 9 && num <= 11) {
        if (!this.specialDamageType) {
          this.InitialiseSpecialDamageType(num); this.improvementList.push(`Initialise Special Damage`); console.log(`Improvement Added: Initialise Special Damage(${this.specialDamageType})`); this.AddSubPrefix(this.specialDamageType);
        } else {
          this.ImproveSpecialDamage(); this.improvementList.push("Special Damage");
        }
      }
      else if (num > 11 && num <= 13) {
        if (!this.specialProperties.includes("Stability")) { this.specialProperties.push("Stability", "This Improvement improves the accuracy of weapons when firing rapidly."); this.improvementList.push("Stability"); this.AddSubPrefix("Stability"); }
        else { this.Improvements(4); }
      }
      else if (num > 13 && num <= 15) {
        if (this.aimLevel < 2) { this.aimLevel ++; this.aim = this.SetAim(this.aimLevel); this.improvementList.push("Aiming"); this.AddSubPrefix("Aiming"); }
        else if (this.rangeLimit < 2) { this.Improvements(4); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 15 && num <= 17) {
        if (this.shootingModeLevel < 6 || this.manufacturer != "Jakobs") {
          this.shootingModeLevel ++;
          if (this.shootingMode[this.shootingModeLevel-1] != null) {
            this.shootingModeLevel ++;
          }
          this.AddShootingMode(this.shootingModeLevel);
          this.improvementList.push("Shooting Mode");
          this.AddSubPrefix("Shooting Mode");
        } else if (this.clipLevel < 3) { this.Improvements(6); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num == 18) {
        if (this.bayonetLevel < 2) { this.bayonetLevel ++; this.bayonet = this.SetBayonet(this.bayonetLevel); this.improvementList.push("Bayonet"); this.AddSubPrefix("Bayonet"); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num == 19) {
        if (!this.specialProperties.includes("Rapid Reload")) { this.specialProperties.push("Rapid Reload", "A weapon that receives this Improvement allows its user to ignore any multi-action penalty that may be caused by reloading it."); this.improvementList.push("Rapid Reload"); console.log("Improvement Added: Rapid Reload"); this.AddSubPrefix("Rapid Reload"); }
        else { this.Improvements(15); }
      }
      else {
        if (this.barrels < 2) { this.barrels ++; this.AddSubPrefix("Barrels"); if (!this.specialProperties.includes("Barrels")) { this.specialProperties.push("Barrels", "Each damage roll gets a +1 bonus. The number of ammo spent per shot is doubled. These effects are cumulative with any shooting mode the weapon may have."); } this.improvementList.push("Barrels"); }
        else { this.Improvements(6); }
      }
  }

  ImproveSpecialDamage() {
    if (this.specialDamageType == "Corrosive") { if (this.specialDamage < 3) { this.specialDamage ++; } else { this.Improvements(8); }}
    if (this.specialDamageType == "Shock") { if (this.specialDamage < 3) { this.specialDamage ++; } else { this.Improvements(1); }}
    if (this.specialDamageType == "Incendiary") { if (this.incendiaryDamageLevel < 3) { this.incendiaryDamageLevel ++; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); } else { this.Improvements(8); }}
    if (this.specialDamageType == "Slag" || this.specialDamageType == "Explosive" || this.specialProperties.includes("Heavy Weapon")) { this.Improvements(1); }
  }

  InitialiseSpecialDamageType(num) {
    if (num <= 4) { this.specialDamageType = "Corrosive"; this.specialDamage = 1; }
    else if (num > 4 && num <= 8) { this.specialDamageType = "Shock"; this.specialDamage = 1; }
    else if (num > 8 && num <= 12) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); }
    else if (num > 12 && num <= 16) { this.specialDamageType = "Slag";  }
    else if (num > 16 && num <= 19) { this.specialDamageType = "Explosive"; }
    else { this.specialProperties.push("Heavy Weapon", "This weapon can deal damage to vehicles and other devices with heavy armor.");  }
  }

  PistolStatBlock() {
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
                  <td colspan="6" class="mx-3">${description}</td>
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
      var div = this.PistolStatBlock();
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

    var div = this.PistolStatBlock();
    div.addClass(`col-md-12 item my-4 item-${this.quality.toLowerCase()}`);
    div.id(`item-highlight`);
    var inventory = select('#inventory-highlight');
    div.parent(inventory);
  }

  AddSubPrefix(improvement) {
      console.log(`Adding Sub Prefix: ${improvement}`);
      const manufacturerArr = ["Bandit", "Dahl", "Hyperion", "Jakobs", "Maliwan", "Tediore", "Torgue", "Vladof"];
      const improvementArr = ["Aiming", "Range", "AP", "Damage", "Heavy Weapon", "Bayonet", "Clip", "Corrosive", "Incendiary", "Shock", "Slag", "Barrels", "Shooting Mode", "Rapid Reload", "Stability"];
      const subPrefixArr = [
          ['misles', 'misles', "murduerer's", "murduerer's", "murduerer's", "Baynaneted", "Extendified", "Crudy", "Fire Fire", "Zapper", "Slaged", "Dubble", "Rapider", "Rapider",  "Marxmans"],
          ['Floated', 'Floated', "Neutralizing", "Neutralizing", "Neutralizing", "Close Quarters", "Loaded", "Corrosive", "Incendiary", "Sapping", "Amped", "Twin", "React", "React", "Tactical"],
          ['Earnest', 'Earnest', "Win-Win", "Win-Win", "Win-Win", "Action", "Maximized", "Base", "Hot Button", "Energizing", "Amplified", "Redundant", "Dynamic", "Dynamic", "Core"],
          ["Straight Shootin'", "Straight Shootin'", "Dastardly", "Dastardly", "Dastardly", "Bowie", "Loaded", "", "", "", "", "Two Fer", "Trick Shot", "Trick Shot", "Gunstock"],
          ["Punctilious", "Punctilious", "Potent", "Potent", "Potent", "Evisceration", "Surfeit", "Trenchant", "Inflammatory", "Electrified", "Scoria", "Binary", "Expeditious", "Expeditious", "Elegant"],
          ["Dependable", "Dependable", "Super", "Super", "Super", "Permasharp", "Jam Packed", "Pine Fresh", "Red Hot", "Energizing", "Disinfecting", "Two for One", "Peppy", "Peppy", "Clean"],
          ["Explicit", "Explicit", "Hard", "Hard", "Hard", "Thrusting", "Crammed", "", "", "", "", "Double Penetrating", "Intense", "Intense", "Stiff"],
          ["Righteous", "Righteous", "Purging", "Purging", "Purging", "Patriot's", "Unending", "Caustic", "Burning", "Discharge", "Slag", "Dva", "Vengeful", "Vengeful", "Resolute"]
      ];
      if (!["Corrosive", "Incendiary", "Shock", "Slag"].includes(improvement)) {
        this.subPrefixArray.push(subPrefixArr[manufacturerArr.indexOf(this.manufacturer)][improvementArr.indexOf(improvement)]);
      } else {
        this.elementalSubPrefix = subPrefixArr[manufacturerArr.indexOf(this.manufacturer)][improvementArr.indexOf(improvement)];
      };
  }

  SelectSubPrefix() {
    var s_prefix = this.subPrefixArray[int(random()*this.subPrefixArray.length-1)];
    console.log(s_prefix);
    return s_prefix ? s_prefix : "";
  }

} //End

class SMG extends Gun {
  constructor(playerLevel, quality) {
    super(playerLevel, quality, "SMG");

    this.InitialiseSMG(this.RollX(20),this.RollX(20));
    this.SetManufacturer(this.manufacturer);

    //Improvement Variables
    this.barrels = 1;
    this.shootingModeLevel = 0;
    this.AddShootingMode(4);
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
    // this.fullname = `${this.specialDamageType ? this.InitialiseSpecialDamageName() : "" } ${this.manufacturer} ${this.prefix}`;

    this.RemoveHTML();
    // this.ConvertToHTML();
    this.AddItemBlock();
  }

  InitialiseSMG(smgNum, manufacturerNum) {
      let smgTypeArr = ["Subcompact MG", "Special", "Ace"];
      let manufacturerArr = ["Bandit", "Dahl", "Hyperion", "Maliwan", "Tediore"];
      let prefixArr = [
        ["smig", "SMG", "Projectile Convergence", "Submalevolent Grace", "Subcompact MG"],
        ["rokgun", "Fox", "Presence", "Trance", "Special"],
        ["smgg", "Falcon", "Transmudera", "Gospels", "Ace"]
      ];

      if (smgNum <= 6) { this.model = smgTypeArr[0]; }
      if (smgNum > 7 && smgNum <= 13) { this.model = smgTypeArr[1]; }
      if (smgNum > 13) { this.model = smgTypeArr[2]; }

      if (manufacturerNum <= 4) { this.manufacturer = manufacturerArr[0]; this.prefix = "smig"; }
      if (manufacturerNum > 4 && manufacturerNum <= 8) { this.manufacturer = manufacturerArr[1]; this.prefix = "SMG"; }
      if (manufacturerNum > 8 && manufacturerNum <= 12) { this.manufacturer = manufacturerArr[2]; this.prefix = "Projectile Convergence"; }
      if (manufacturerNum > 12 && manufacturerNum <= 16) { this.manufacturer = manufacturerArr[3]; this.prefix = "SubMalevolent Grace"; }
      if (manufacturerNum > 16){ this.manufacturer = manufacturerArr[4]; this.prefix = "Subcompact MG"; }

      this.prefix = prefixArr[smgTypeArr.indexOf(this.model)][manufacturerArr.indexOf(this.manufacturer)];

      switch(this.model) {
        case "Subcompact MG": this.InitialiseSubcompactMGStats(); break;
        case "Special": this.InitialiseSpecialStats(); break;
        case "Ace": this.InitialiseAceStats(); break;
        default: console.log("%cThere was an error initialising the gun", "color: red"); break;
      }
  }

  InitialiseSubcompactMGStats() {
      this.rangeLevel = 6;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 2;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 3;
      this.clip = this.initialClip = 28;
      this.strength = "-";
      this.ap  = 0;

      this.aimLevel = 0;
      this.aim = this.SetAim(this.aimLevel);
  }
  InitialiseSpecialStats() {
      this.rangeLevel = 6;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 3;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 3;
      this.clip = this.initialClip = 28;
      this.strength = "d6";
      this.ap  = 0;

      this.aimLevel = 0;
      this.aim = this.SetAim(this.aimLevel);
  }
  InitialiseAceStats() {
      this.rangeLevel = 7;
      this.range = this.SetRange(this.rangeLevel);
      this.damageLevel = 1;
      this.damage = this.SetDamage(this.damageLevel);
      this.rateOfFire = 3;
      this.clip = this.initialClip = 26;
      this.strength = "-";
      this.ap  = 0;

      this.aimLevel = 1;
      this.aim = this.SetAim(this.aimLevel);
  }

  Improvements(num) {
      if (num <= 2) {
          if (this.damageLimit < 2) { this.damageLimit ++; this.damageLevel ++; this.damage = this.SetDamage(this.damageLevel); this.improvementList.push("Damage"); this.AddSubPrefix("Damage"); }
          else if (this.apLimit < 2) { this.Improvements(7); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num == 3) {
          if (this.rangeLimit < 2) { this.rangeLimit ++; this.rangeLevel ++; this.range = this.SetRange(this.rangeLevel); this.improvementList.push("Range"); this.AddSubPrefix("Range"); }
          else if (this.aimLevel < 1) { this.Improvements(15); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num == 4) {
          if (this.barrels < 2) { this.barrels ++; this.improvementList.push("Barrels"); }
          else { this.Improvements(5); }
          if (!this.specialProperties.includes("Barrels")) { this.specialProperties.push("Barrels", "Each damage roll gets a +1 bonus. The number of ammo spent per shot is doubled. These effects are cumulative with any shooting mode the weapon may have."); }
      }
      else if (num > 5 && num <= 6) {
          if (this.clipLevel < 3) { this.clipLevel ++; this.ImproveClip(this.clipLevel); this.improvementList.push("Clip");}
          else if (this.shootingModeLevel < 6) { this.Improvements(17); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 6 && num <= 8) {
          if(this.apLimit < 2) { this.ap ++; this.improvementList.push("AP"); this.AddSubPrefix("AP");}
          else if (this.damageLimit < 2) { this.Improvements(1); }
          else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 9 && num <= 12) {
        if (!this.specialDamageType) {
          this.InitialiseSpecialDamageType(num); this.improvementList.push(`Initialise Special Damage: ${this.specialDamageType}`);
        } else {
          this.ImproveSpecialDamage(); this.improvementList.push("Special Damage");
        }
      }
      else if (num > 12 && num <= 14) {
        if (!this.specialProperties.includes("Stability")) { this.specialProperties.push("Stability", "This Improvement improves the accuracy of weapons when firing rapidly."); this.improvementList.push("Stability"); this.AddSubPrefix("Stability"); }
        else { this.Improvements(3); }
      }
      else if (num > 14 && num <= 16) {
        if (this.aimLevel < 1) { this.aimLevel ++; this.aim = this.SetAim(this.aimLevel); this.improvementList.push("Aim"); this.AddSubPrefix("Aiming");}
        else if (this.rangeLimit < 2) { this.Improvements(3); }
        else { this.Improvements(this.RollX(20)); }
      }
      else if (num > 16 && num <= 18) {
        if (this.shootingModeLevel < 6) {
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
      else if (num == 19) {
          if (!this.specialProperties.includes("Rapid Reload")) { this.specialProperties.push("Rapid Reload", "A weapon that receives this Improvement allows its user to ignore any multi-action penalty that may be caused by reloading it."); this.improvementList.push("Rapid Reload"); this.AddSubPrefix("Rapid Reload"); }
          else { this.Improvements(5); }
      }
      else {
          if (this.bayonetLevel < 2) { this.bayonetLevel ++; this.bayonet = this.SetBayonet(this.bayonetLevel); this.improvementList.push("Bayonet"); this.AddSubPrefix("Bayonet"); }
          else { this.Improvements(this.RollX(20)); }
      }
  }

  ImproveSpecialDamage() {
    if (this.specialDamageType == "Corrosive") { if (this.specialDamage < 3) { this.specialDamage ++; } else { this.Improvements(7); }}
    if (this.specialDamageType == "Shock") { if (this.specialDamage < 3) { this.specialDamage ++; } else { this.Improvements(1); }}
    if (this.specialDamageType == "Incendiary") { if (this.incendiaryDamageLevel < 3) { this.incendiaryDamageLevel ++; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); } else { this.Improvements(7); }}
    if (this.specialDamageType == "Slag" || this.specialDamageType == "Explosive") { this.Improvements(1); }
  }

  InitialiseSpecialDamageType(num) {
    if (num <= 5) { this.specialDamageType = "Corrosive"; this.specialDamage = 1; this.AddSubPrefix("Corrosive"); }
    else if (num > 5 && num <= 10) { this.specialDamageType = "Shock"; this.specialDamage = 1; this.AddSubPrefix("Shock"); }
    else if (num > 10 && num <= 15) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); this.AddSubPrefix("Incendiary"); }
    else if (num > 15 && num <= 19) { this.specialDamageType = "Slag"; this.AddSubPrefix("Slag"); }
    else { this.specialDamageType = "Explosive"; }
  }

  SMGStatBlock() {
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

      var div = this.SMGStatBlock();
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

    var div = this.SMGStatBlock();
    div.addClass(`col-md-12 item my-4 item-${this.quality.toLowerCase()}`);
    div.id(`item-highlight`);
    var inventory = select('#inventory-highlight');
    div.parent(inventory);
  }

  AddSubPrefix(improvement) {
      const manufacturerArr = ["Bandit", "Dahl", "Hyperion", "Maliwan", "Tediore"];
      const improvementArr = ["Aiming", "Range", "AP", "Damage", "Bayonet", "Corrosive", "Incendiary", "Shock", "Slag", "Shooting Mode", "Rapid Reload", "Stability"];
      const subPrefixArr = [
          ["Akurate", "Akurate", "Murduring", "Murduring", "Cuting", "Crudy", "Fire Fire", "Zapper", "Slaged", "Bulets Go Fasterified" , "Agresive", "Ballansed"],
          ["Deft", "Deft", "Stopping", "Stopping", "Bladed", "Corrosive", "Incendiary", "Sapping", "Amp", "Flying" , "Skirmish", "Stoic"],
          ["Analytical", "Analytical", "Rightsizing", "Rightsizing", "Cutting Edge", "Base", "Hot Button", "Energizing", "Amplified", "Proactive" , "Social", "Corporate"],
          ["Guileless", "Guileless", "Consummate", "Consummate", "Acuminous", "Caustic", "Fervid", "Storming", "Feculent", "Impetuous" , "Apt", "Lucid"],
          ["Guaranteed", "Guaranteed", "Hefty", "Hefty", "Perma-Sharp", "Perpperment", "Toasty", "Sparkling", "Biodegradable", "Brisk" , "Refill", "Quality"]
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

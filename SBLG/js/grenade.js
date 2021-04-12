class Grenade extends Item {
    constructor(playerLevel, quality) {
        super(playerLevel, quality, "Grenade");

        //Initialisation
        this.damageLevel = 1;
        this.damage = this.SetDamage(this.damageLevel);
        this.range = "5/10/20";
        this.deliveryLevel = 2;
        this.delivery = this.SetDelivery(this.deliveryLevel);
        this.aoeLevel = 2;
        this.aoe = this.SetAOE(this.aoeLevel);
        this.fuse = -1;

        this.specialDamageType;
        this.specialDamage;
        this.IncendiaryDamageLevel;

        this.InitGrenade(this.RollX(20));
        this.InitSpecialProperties();

        //Update Special Properties Descriptions
        this.UpdateSpecialPropertiesDescriptions();

        for (var i = 0; i < this.improvements; i ++) {
            this.Improvements(this.RollX(20));
        }

        //Initialise fullname
        if (this.manufacturer == "Bandit") {
          this.ConvertToBandit();
        } else {
          if (this.specialDamageType != null) {
              if (this.manufacturer == "Vladof") { this.fullname = `${this.specialProperties[2] == "Sticky" ? "Sticky" : ""} ${this.delivery == "Standard"? "Lobbed" : this.delivery} ${this.fullname}`;  }
              else { this.fullname = `${this.specialProperties[2] == "Sticky" ? "Sticky" : ""} ${this.specialDamageType} ${this.delivery == "Standard"? "Lobbed" : this.delivery} ${this.prefix}`; }
          } else {
            this.fullname = `${this.specialProperties[2] == "Sticky" ? "Sticky" : ""} ${this.delivery == "Standard"? "Lobbed" : this.delivery} ${this.prefix}`;
          }
        }

        this.RemoveHTML();
        // this.ConvertToHTML();
        this.AddItemBlock();
    }

    InitGrenade(num) {
      if (num <= 4) { let n = this.RollX(20); this.manufacturer = n <= 10 ?  "Bandit" : "Torgue"; this.prefix = "MIRV"; }
      if (num > 4 && num <= 8) { this.manufacturer = "Dahl"; this.prefix = "Bouncing Betty"; }
      if (num > 8 && num <= 12) { this.manufacturer = "Vladof"; this.prefix = "Area of Effect";  }
      if (num > 12 && num <= 16) { this.manufacturer = "Hyperion"; this.prefix = "Singularity"; }
      if (num > 16) { this.manufacturer = "Maliwan"; this.prefix = "Transfusion"; }
    }

    InitSpecialDamage(num) {
        if (num == 1) { this.specialDamageType = "Corrosive"; this.specialDamage = 1; }
        if (num == 2) { this.specialDamageType = "Shock"; this.specialDamage = 1; }
        if (num == 3) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); }
        if (num == 4) { this.specialDamageType = "Slag"; }
    }

    InitVladofSpecialDamage(num) {
        if (num <= 2) { this.specialDamageType = "Corrosive"; this.specialDamage = 1; this.fullname = "Cloud"; }
        if  (num > 2 && num <= 4) { this.specialDamageType = "Shock"; this.specialDamage = 1; this.fullname = "Tesla"; }
        if (num > 4) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); this.fullname = "Fire Burst"; }
    }

    InitSpecialProperties() {
        if (this.prefix == "Area of Effect") { this.InitVladofSpecialDamage(this.RollX(6)); this.specialProperties.push("Area of Effect"); }
        if (this.prefix == "Bouncing Betty") { this.specialProperties.push("Bouncing Betty"); }
        if (this.prefix == "MIRV") { this.aoeLevel ++; this.aoe = this.SetAOE(this.aoeLevel); this.specialProperties.push("MIRV"); }
        if (this.prefix == "Singularity") { this.specialProperties.push("Singularity"); }
        if (this.prefix == "Transfusion") { this.specialProperties.push("Transfusion"); }
    }

    UpdateSpecialPropertiesDescriptions() {
        if (this.prefix == "Area of Effect") { this.specialProperties.push(`When a grenade with this Mod isused, all creatures ending their turn or moving inside a ${this.aoe} suffer the grenade’s damage again. When this happens, add ${this.specialDamage} ${this.specialDamageType} to the grenade’s standard damage.`); }
        if (this.prefix == "Bouncing Betty") { this.specialProperties.push(`These deadly mines are designed to pop up into the air and rain shrapnel down from about headheight. Only full overhead cover offers an Armor bonus against such devices. Simply being prone offers no protection from these deadly explosives.`); }
        if (this.prefix == "MIRV") { this.specialProperties.push(`Upon detonation the parent MIRV grenade spawns child grenades. The grenade's area of effect is improved.`); }
        if (this.prefix == "Singularity") { this.specialProperties.push(`Evade rolls made by the targets of this kind of grenade suffer an additional -1 penalty, for a total of -3 (if no other specific modifier comes into play).`); }
        if (this.prefix == "Transfusion") { this.specialProperties.push(`When a Transfusion grenade deals at least one wound to a target, the character who threw it may make a Vigor check. If he succeeds, he instantly heals one of his own wounds.`); }
    }

    //Set Damage, returns string
    SetDamage(num) {
        if (num == 1) { return "3d6"; }
        if (num == 2) { return "3d6+2"; }
        if (num == 3) { return "3d8"; }
        if (num == 4) { return "3d8+2"; }
        if (num == 5) { return "3d10"; }
    }

    SetDelivery(num) {
      if (num == 1) { return "Rubberised"; }
      if (num == 2) { return "Standard"; }
      if (num == 3) { return "Lowbow"; }
      if (num == 4) { return "Homing"; }
    }

    SetAOE(num) {
      if (num == 1) { return "Small"; }
      if (num == 2) { return "Medium"; }
      if (num == 3) { return "Large"; }
    }

    Improvements(num) {
        if (num <= 4) {
            if (this.damageLevel < 5) { this.damageLevel ++; this.damage = this.SetDamage(this.damageLevel); this.improvementList.push("Damage"); }
            else if (this.aoeLevel < 3 ){ this.Improvements(5); }
            else { this.Improvements(this.RollX(20)); }
        } else if (num > 4 && num <= 6) {
            if (this.aoeLevel < 3) { this.aoeLevel ++; this.aoe = this.SetAOE(this.aoeLevel); this.improvementList.push("AOE"); }
            else if (this.damageLevel < 5){ this.Improvements(1); }
            else { this.Improvements(this.RollX(20)); }
        } else if (num > 6 && num <= 10) {
            if (this.fuse > -2) { this.fuse --; this.improvementList.push("Fuse"); }
            else { this.Improvements(19); }
        } else if (num > 10 && num <= 14) {
            if (!this.specialDamageType) { this.InitSpecialDamage(this.RollX(4)); this.improvementList.push("Initialise Special Damage");}
            else {
                if (this.specialDamage == 5 || this.specialDamage == "1d6" || this.specialDamageType == "Slag") {
                    this.Improvements(1);
                } else if (this.specialDamageType == "Incendiary") {
                    this.incendiaryDamageLevel ++;
                    this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); this.improvementList.push("Special Damage");
                } else {
                    this.specialDamage ++; this.improvementList.push("Special Damage");
                }
            }
        } else if (num == 15) {
            if (this.delivery != "Rubberised") { this.deliveryLevel = 1; this.delivery = this.SetDelivery(this.deliveryLevel); this.Improvements(this.RollX(20)); this.Improvements(this.RollX(20)); this.improvementList.push("Rubberised"); }
            else { this.Improvements(1); }
        } else if (num > 15 && num <= 18) {
            if (this.deliveryLevel < 4 && this.delivery != "Rubberised") { this.deliveryLevel ++; console.log(`Delivery Level: ${this.deliveryLevel}`); this.delivery = this.SetDelivery(this.deliveryLevel); this.improvementList.push("Delivery"); }
            else { this.Improvements(7); }
        } else {
            var sticky = false;
            for (var i = 0; i < this.specialProperties.length; i ++) {
                if (this.specialProperties[i] == "Sticky") { sticky = true; }
            }
            if (!this.specialProperties.includes("Sticky")) { this.specialProperties.push("Sticky"); this.specialProperties.push("A character throwing this grenade gets a +1 bonus to his roll. These grenades can be attached to any surface, whether manually or when throwning them."); this.improvementList.push("Sticky"); }
            else if (this.aoeLevel < 3){ this.Improvements(5); }
            else { this.Improvements(this.RollX(20)); }
        }
    }

    ConvertToBandit() {
      var stickylobbed;
      if (this.specialProperties[2] == "Sticky" && this.delivery == "Standard") {
        stickylobbed = "Throw'n Stik";
      } else if (this.specialProperties[2] != "Sticky" && this.delivery == "Standard") {
        stickylobbed = "Throwin";
      } else if (this.specialProperties[2] == "Sticky" && this.delivery != "Standard") {
        stickylobbed = "Stiky";
      } else {
        stickylobbed = "";
      }
      if (this.specialDamageType != null) {
        var banditSpecDamageType;
          if (this.specialDamageType == "Corrosive") {
            banditSpecDamageType = "Asidy";
          } else if (this.specialDamageType == "Incendiary") {
            banditSpecDamageType = "burnin";
          } else if (this.specialDamageType == "Shock") {
            banditSpecDamageType = "Lectrik";
          } else {
            banditSpecDamageType = "Sluj";
          }
          this.fullname = `${banditSpecDamageType} ${stickylobbed}  ${this.delivery != "Standard" ? this.delivery : ""} ${this.prefix}`;
      } else {
        this.fullname = `${stickylobbed} ${this.delivery != "Standard" ? this.delivery : ""} ${this.prefix}`;
      }
    }

    GrenadeStatBlock() {
      var notes = [];
      for (var i = 0; i < this.specialProperties.length; i += 2) {
          notes.push(`<b>${this.specialProperties[i]}</b>: ${this.specialProperties[i+1]} <br>`);
      }
      var description = join(notes, " ");

      var imp = join(this.improvementList, " | ");

        return createDiv(
              `<h4 class="text-right">${this.playerLevel}</h4>
              <table width="100%" cellpadding="5">
                  <tr>
                      <td colspan="3" align="center"><h3 class="${this.quality.toLowerCase()}">${this.fullname}</h3></td>
                  </tr>
                  <tr class="stats">
                      <td width="40%" align="center">${this.prefix}</td>
                      <td width="40%">Damage</td>
                      <td width="20%" align="right">${this.damage}</td>
                  </tr>
                  <tr class="stats">
                      <td class="gun-category" align="center" rowspan="2" valign="center"><img src="./img/categories/${this.category} ${this.quality}.png" class="img-fluid" width="100"/></td>
                      <td>Delivery</td>
                      <td align="right">${this.delivery}</td>
                  </tr>
                  <tr class="stats">
                      <td>AOE</td>
                      <td align="right">${this.aoe}</td>
                  </tr>
                  <tr class="stats">
                      <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
                      <td>Elem Dmg</td>
                      <td align="right">${!this.specialDamage ? "-": this.specialDamage }</td>
                  </tr>
                  <tr>
                      <td colspan="3" class="mx-3">${description}</td>
                  </tr>
                  <tr>
                      <td align="right" colspan="2" valign="center"><h3 id="improvements" data-toggle="tooltip"  class="text-left ml-2" title="${imp}">Improvements</h3></td>
                      <td align="right" valign="center"><h3 class="text-right green">${this.manufacturer}</h3></td>
                  </tr>
              </table>`
        );
    }

    ConvertToHTML(){
        var div = this.GrenadeStatBlock();
        div.addClass(`col-md-6 item my-4 item-${this.quality.toLowerCase()} `);
        var inventory = select('#inventory');
        div.parent(inventory);
    }

    RemoveHTML() {
      var inventoryHighlight = document.getElementById('inventory-highlight');
      if (inventoryHighlight.childNodes.length != 1) {
        var removeDiv = select('#item-highlight');
        removeDiv.remove();
      }

      var div = this.GrenadeStatBlock();
      div.addClass(`col-md-12 item my-4 item-${this.quality.toLowerCase()}`);
      div.id(`item-highlight`);

      var inventory = select('#inventory-highlight');
      div.parent(inventory);
    }
}

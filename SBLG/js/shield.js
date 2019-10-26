class Shield extends Item {
  constructor(playerLevel, quality) {
    super(playerLevel, quality, "Shield");

    //Initialisation
    this.capacity = 4;
    this.reactivityLevel = 2;
    this.reactivity = this.SetReactivity(this.reactivityLevel);
    this.rechargeRate = 1;
    this.weight = 2;

    this.specialDamageType;
    this.specialDamage;
    this.incendiaryDamageLevel;

    this.InitShield(this.RollX(20));
    this.InitSpecialProperties();

    //Improvements
    for (var i = 0; i < this.improvements; i ++) {
        this.Improvements(this.RollX(20));
    }

    //Update Special Properties Descriptions
    this.UpdateSpecialPropertiesDescriptions();

    //Initialise Name
    if (this.specialDamageType != null) {
      this.fullname = this.specialDamageType + " " + this.manufacturer + " " + this.prefix;
    } else {
      this.fullname = this.manufacturer + " " + this.prefix;
    }

    this.RemoveHTML();
    // this.ConvertToHTML();
    this.AddItemBlock();
  }

  display(x, y) {
    fill(255);
    text("Name: " + this.fullname, x, y);
    text("Type: " + this.category, x, y+10);

    //Stats
    text("Capacity: " + this.capacity, x, y+30);
    text("Reactivity: " + this.reactivity, x, y+40);
    text("Recharge Rate: " + this.rechargeRate, x, y+50);
    this.notes = join(this.specialProperties, ", ");
    text("Notes: " + this.notes, x, y+60, width/2, height);
  }


  InitShield(num) {
      console.log("Initialising Shield");
      console.log("Rolled: " + num);
      if (num <= 2) { this.manufacturer = "Anshin"; this.prefix = "Adaptive"; }
      else if  (num > 2 && num <= 4) { this.manufacturer = "Bandit"; this.prefix = "Roid"; }
      else if  (num > 4 && num <= 6) { this.manufacturer = "Dahl"; this.prefix = "Booster"; }
      else if  (num > 2 && num <= 8) { this.manufacturer = "Hyperion"; this.prefix = "Amplify"; }
      else if  (num > 2 && num <= 10) { this.manufacturer = "Maliwan"; this.prefix = "Nova"; }
      else if  (num > 2 && num <= 12) { this.manufacturer = "Maliwan"; this.prefix = "Spike"; }
      else if  (num > 2 && num <= 14) { this.manufacturer = "Pangolin"; this.prefix = "Turtle"; }
      else if  (num > 2 && num <= 16) { this.manufacturer = "Tediore"; this.prefix = "Shield"; }
      else if  (num == 17) { this.manufacturer = "Torgue"; this.prefix = "Nova"; }
      else if  (num == 18) { this.manufacturer = "Torgue"; this.prefix = "Spike"; }
      else { this.manufacturer = "Vladof"; this.prefix = "Absorption"; }
      console.log("Manufacturer: " + this.manufacturer + " " + this.prefix);
  }

  InitSpecialProperties() {
    if (this.prefix == "Absorption") {
      this.absorptionLevel = 1;
      this.absorption = this.SetAbsorption(this.absorptionLevel);
      this.specialProperties.push("Absorption");
    }
    if (this.prefix == "Adaptive") {
      this.adaptiveProtection = 1;
      this.adaptiveToughness = 1;
      this.specialProperties.push("Adaptive");
    }
    if (this.prefix == "Amplify") {
      this.amplify = 1;
      this.specialProperties.push("Amplify");
    }
    if (this.prefix == "Booster") {
      this.booster = this.rechargeRate;
      this.specialProperties.push("Booster");
    }
    if (this.prefix == "Nova") {
      this.InitSpecialDamage(this.RollX(4));
      this.novaDamageLevel = 1;
      this.novaDamage = this.SetNovaDamage(this.novaDamageLevel);
      this.novaTemplateLevel = 1;
      this.novaTemplate = this.SetNovaTemplate(this.novaTemplateLevel);
      this.novaSpecialDamageResistanceLevel = 1;
      this.novaSpecialDamageResistance = this.SetSpecialDamageResistance(this.novaSpecialDamageResistanceLevel);
      this.specialProperties.push("Nova");
    }
    if (this.prefix == "Roid") {
      this.roid = 2;
      this.specialProperties.push("Roid");
    }
    if (this.prefix == "Spike") {
      this.InitSpecialDamage(this.RollX(4));
      this.spikeDamageLevel = 1;
      this.spikeDamage = this.SetSpikeDamage(this.spikeDamageLevel);
      this.spikeSpecialDamageResistanceLevel = 1;
      this.spikeSpecialDamageResistance = this.SetSpecialDamageResistance(this.spikeSpecialDamageResistanceLevel);
      this.specialProperties.push("Spike");
    }
    if (this.prefix == "Shield") {
      this.reactivity += "+1"; this.rechargeRate ++; this.capacity --;
    }
    if (this.prefix == "Turtle") {
      this.turtleLevel = 1;
      this.turtleToughness;
      this.turtleCapacity;
      this.SetTurtle(this.turtleLevel);
      this.specialProperties.push("Turtle");
    }
  }

  UpdateSpecialPropertiesDescriptions() {
      if (this.prefix == "Absorption") { this.specialProperties.push("When someone carrying an Absorption shield is hit, he rolls 1d10 before figuring out the damage. If he gets a "+ this.absorption +", the damage is simply ignored."); }
      if (this.prefix == "Adaptive") { this.specialProperties.push("When a character is carrying an Adaptive shield is hit by a weapon inflicting special damage, he is granted special protection. From that point, he can ignore " + this.adaptiveProtection + " level/s of special damage of the type inflicted by the weapon that just  hit him.\n This protection is not cumulative and does not apply to the damage from the hit that triggered this special property. \n Adaptive shields also grant the character carrying them a +" + this.adaptiveToughness + " bonus to Toughness."); }
      if (this.prefix == "Amplify") { this.specialProperties.push("When fully charged, an Amplify shield grants a " + this.amplify + " bonus to damage to the character carrying it. When this additional damage is inflicted, the shield Capacity is temporarily reduced by 1, and the shield is considered Disabled."); }
      if (this.prefix == "Booster") { this.specialProperties.push(`Everytime a character carrying a Booster shield is hit, and the damage from that hit exceeds the shield's current capacity, a booster is generated and placed on an adjacent square. An ally passing through this square automatically recharges his own shield by ${this.rechargeRate + this.booster}. This doesn't re-enable a disabled shield, though.`); }
      if (this.prefix == "Nova") { this.specialProperties.push("When a Nova Shield's Capacity is reduced to zero, all enemies in a " + this.novaTemplate + " suffer " + this.novaDamage + " damage. If the Nova Shield is a Maliwan, the enemies also suffer " + this.specialDamage + " " + this.specialDamageType + " damage."); }
      if (this.prefix == "Roid") { this.specialProperties.push("As long as a Roid Shield's current Capacity is equal to zero, the character carrying it gains a +" + this.roid + " bonus to damage dealt in close combat."); }
      if (this.prefix == "Spike") { this.InitSpecialDamage(this.RollX(4)); this.specialProperties.push("As long as a Spike Shield is enabled, all enemies suffer " + this.spikeDamage + " damage every time they inflict close combat damage to the character carrying it. If the Spike Shield is Maliwan, enemies also suffer " + this.specialDamage + " " + this.specialDamageType + " damage."); }
      if (this.prefix == "Turtle") { this.specialProperties.push("Turtle shields have a +" + this.turtleCapacity + " bonus to their Capacity, but the characters carrying them suffer a " + this.turtleToughness + " penalty to their Toughness."); }
  }

  InitSpecialDamage(num) {
    if (num == 1) { this.specialDamageType = "Corrosive"; this.specialDamage = 1; }
    if (num == 2) { this.specialDamageType = "Shock"; this.specialDamage = 1; }
    if (num == 3) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); }
    if (num == 4) { this.specialDamageType = "Slag"; }
  }

  SetReactivity(num) {
      var ted = "";
      if (this.manufacturer == "Tediore") { ted = "+1"; }
      if (num == 1) { return "d4-2"; }
      if (num == 2) { return "d4" + ted; }
      if (num == 3) { return "d6" + ted; }
      if (num == 4) { return "d8" + ted; }
      if (num == 5) { return "d10" + ted; }
      if (num == 6) { return "d12" + ted; }
  }

  //Set Absorption Range - returns String
  SetAbsorption(num) {
      if (num == 1) { return "10"; }
      if (num == 2) { return "9 - 10"; }
      if (num == 3) { return "8 - 10"; }
  }

  //Set Nova Damage - returns String
  SetNovaDamage(num) {
      if (num == 1) { return "3d6"; }
      if (num == 2) { return "3d6+2"; }
      if (num == 3) { return "3d8"; }
      if (num == 4) { return "3d8+2"; }
      if (num == 5) { return "3d10"; }
  }

  //Set Nova Template - returns String
  SetNovaTemplate(num) {
      if (num == 1) { return "Adjacent foes"; }
      if (num == 2) { return "Medium Burst Template"; }
      if (num == 3) { return "Large Burst Template"; }
  }

  //Set Special Damage Resistance - returns String
  SetSpecialDamageResistance(num) {
      if (num == 1) { return "Negates one level"; }
      if (num == 2) { return "Negates two levels"; }
      if (num == 3) { return "Negates three levels"; }
      if (num == 4) { return "Complete immunity"; }
  }

  //Set Spike Damage - returns String
  SetSpikeDamage(num) {
      if (num == 1) { return "2d6"; }
      if (num == 2) { return "2d6+1"; }
      if (num == 3) { return "2d8"; }
      if (num == 4) { return "2d8+1"; }
      if (num == 5) { return "2d10"; }
      if (num == 5) { return "2d10+1"; }
      if (num == 5) { return "2d12"; }
  }

  //Set Turtle Toughness and Capacity
  SetTurtle(num) {
      if (num == 1) { this.turtleToughness = -1; this.turtleCapacity = 1; this.capacity += this.turtleCapacity; }
      if (num == 2) { this.turtleToughness = -1; this.turtleCapacity = 2; this.capacity += -1 + this.turtleCapacity; }
      if (num == 3) { this.turtleToughness = -2; this.turtleCapacity = 4; this.capacity += -2 + this.turtleCapacity; }
  }

  //Improvements
  Improvements(num) {

      if(num <= 5) {
          if (this.capacity <= 12) { this.capacity ++; this.improvementList.push("Capacity"); }
          else { this.Improvements(11); }
      } else if (num > 5 && num <= 10) {
         if (this.reactivityLevel < 6) { this.reactivityLevel ++; this.reactivity = this.SetReactivity(this.reactivityLevel); this.improvementList.push("Reactivity"); }
         else { this.Improvements(1); }
     } else if (num > 10 && num <= 15) {
         if (this.rechargeRate < floor(this.capacity/2)) { this.rechargeRate ++; this.improvementList.push("Recharge Rate"); }
         else { this.Improvements(1); }
     } else {
         this.ImproveSpecialProperty();
     }

  }

  ImproveSpecialProperty() {
      if (this.prefix == "Absorption") {
          if (this.absorptionLevel < 3) { this.absorptionLevel ++; this.absorption = this.SetAbsorption(this.absorptionLevel); this.improvementList.push("Absorption"); }
          else { this.Improvements(1); }
       }
      if (this.prefix == "Adaptive") {
          this.ImproveAdaptive(this.RollX(4));
      }
      if (this.prefix == "Amplify") {
          if (this.amplify < 3) { this.amplify ++; this.improvementList.push("Amplify"); }
          else { this.Improvements(1); }
      }
      if (this.prefix == "Booster") {
          if (this.booster < 3) { this.booster ++; this.improvementList.push("Booster"); }
          else { this.Improvements(1); }
      }
      if (this.prefix == "Nova") {
          this.ImproveNova(this.RollX(8));
      }
      if (this.prefix == "Roid") {
          if (this.roid < 4) { this.roid ++; this.improvementList.push("Roid"); }
          else { this.Improvements(1); }
      }
      if (this.prefix == "Spike") {
          this.ImproveSpike(this.RollX(4));
      }
      if (this.prefix == "Shield") {
        this.improvementList.push("Re-rolling");
        this.Improvements(this.RollX(15));
      }
      if (this.prefix == "Turtle") {
          if (this.turtleLevel < 3) { this.turtleLevel ++; this.SetTurtle(this.turtleLevel); this.improvementList.push("Turtle"); }
          else { this.Improvements(1); }
      }
  }

  ImproveAdaptive(num) {
      if (this.adaptiveProtection == 5 && this.adaptiveToughness == 3) {
          this.Improvements(1);
      } else if (num <= 2) {
          if (this.adaptiveProtection < 5) { this.adaptiveProtection ++; this.improvementList.push("Adaptive Protection"); }
          else { this.ImproveAdaptive(3); }
      } else {
          if (this.adaptiveToughness < 3) { this.adaptiveToughness ++; this.improvementList.push("Adaptive Toughness"); }
          else { this.ImproveAdaptive(1); }
      }
  }

  ImproveNova(num) {
      if (this.novaDamageLevel == 5 && this.novaTemplateLevel == 3 && this.novaSpecialDamageResistanceLevel == 4 || this.specialDamageType == "Slag") {
          this.Improvements(1);
      } else if (num <= 3) {
          if (this.novaDamageLevel < 5) { this.novaDamageLevel ++; this.novaDamage = this.SetNovaDamage(this.novaDamageLevel); this.improvementList.push("Nova Damage"); }
          else { this.ImproveNova(6); }
      } else if (num > 3 && num <= 7) {
          if (this.novaTemplateLevel < 3) { this.novaTemplateLevel ++; this.novaTemplate = this.SetNovaTemplate(this.novaTemplateLevel); this.improvementList.push("Nova Burst Template"); }
          else { this.ImproveNova(1); }
      } else {
          if (this.novaSpecialDamageResistanceLevel < 4) { this.novaSpecialDamageResistanceLevel ++; this.novaSpecialDamageResistance = this.SetSpecialDamageResistance(this.novaSpecialDamageResistanceLevel); this.improvementList.push("Nova Resistance"); }
          else {this.ImproveNova(1); }
      }
  }

  ImproveSpike(num) {
      if (this.spikeDamageLevel == 7 && this.spikeSpecialDamageResistanceLevel == 4 || this.specialDamageType == "Slag") {
          this.Improvements(1);
      } else if (num <= 3) {
          if (this.spikeDamageLevel < 7) { this.spikeDamageLevel ++; this.spikeDamage = this.SetSpikeDamage(this.spikeDamageLevel); this.improvementList.push("Spike Damage"); }
          else { this.ImproveSpike(4); }
      } else {
          if (this.spikeSpecialDamageResistanceLevel < 4) { this.spikeSpecialDamageResistanceLevel ++; this.spikeSpecialDamageResistance = this.SetSpecialDamageResistance(this.spikeSpecialDamageResistanceLevel); this.improvementList.push("Spike Resistance"); }
          else {this.ImproveSpike(1); }
      }
  }

  ShieldStatBlock() {
    var imp = join(this.improvementList, " | ");
    return createDiv(
          `<h4 class="text-right">${this.playerLevel}</h4>
          <table width="100%" cellpadding="5">
              <tr>
                  <td colspan="3" align="center"><h3 class="${this.quality.toLowerCase()}">${this.fullname}</h3></td>
              </tr>
              <tr class="stats">
                  <td width="33%" align="center">${this.quality}</td>
                  <td width="33%">Capacity</td>
                  <td width="33%" align="right">${this.capacity}</td>
              </tr>
              <tr class="stats">
                  <td class="gun-category" align="center" rowspan="2" valign="center"><img src="./img/categories/${this.category} ${this.quality}.png" class="img-fluid" width="100"/></td>
                  <td>Reactivity</td>
                  <td align="right">${this.reactivity}</td>
              </tr>
              <tr class="stats">
                  <td>Recharge Rate</td>
                  <td align="right">${this.rechargeRate}</td>
              </tr>
              ${this.HTMLStatVariables()}
              <tr>
                  <td colspan="3">${this.specialProperties[0] != null ? `<b>${this.specialProperties[0]}</b>:` : ""} ${this.specialProperties[1] != null ? this.specialProperties[1] : ""}</td>
              </tr>
              <tr>
                  <td align="right" colspan="2" valign="center"><h3 id="improvements" data-toggle="tooltip"  class="text-left ml-2" title="${imp}">Improvements</h3></td>
                  <td align="right"><h3 class="text-right ${this.quality.toLowerCase()}">${this.manufacturer}</h3></td>
              </tr>
          </table>`
    );
  }

  HTMLStatVariables() {
    if (this.prefix == "Absorption") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Absorption</td>
          <td align="right">${this.absorption}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td></td>
          <td align="right"></td>
      </tr>
      `;
    } else if (this.prefix == "Adaptive") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Adaptive Protection</td>
          <td align="right">${this.adaptiveProtection}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td>Adaptive Toughness</td>
          <td align="right">${this.adaptiveToughness}</td>
      </tr>
      `;
    } else if (this.prefix == "Amplify") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Amplify</td>
          <td align="right">${this.amplify}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td></td>
          <td align="right"></td>
      </tr>
      `;
    } else if (this.prefix == "Booster") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Booster</td>
          <td align="right">${this.booster}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td></td>
          <td align="right"></td>
      </tr>
      `;
    } else if (this.prefix == "Nova") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Nova Damage</td>
          <td align="right">${this.novaDamage}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td>Nova Template</td>
          <td align="right">${this.novaTemplate}</td>
      </tr>
      <tr class="stats">
          <td align="center"></td>
          <td>Nova Resistance</td>
          <td align="right">${this.novaSpecialDamageResistance}</td>
      </tr>
      `;
    } else if (this.prefix == "Roid") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Roid Damage</td>
          <td align="right">${this.roid}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td></td>
          <td align="right"></td>
      </tr>
      `;
    } else if (this.prefix == "Spike") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Spike Damage</td>
          <td align="right">${this.spikeDamage}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td>Spike Resistance</td>
          <td align="right">${this.spikeSpecialDamageResistance}</td>
      </tr>
      `;
    } else if (this.prefix == "Turtle") {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td>Turtle Toughness</td>
          <td align="right">${this.turtleToughness}</td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td>Turtle Capacity</td>
          <td align="right">${this.turtleCapacity}</td>
      </tr>
      `;
    } else {
      return `
      <tr class="stats">
          <td align="center">${!this.specialDamageType ? "None" : this.specialDamageType }</td>
          <td></td>
          <td align="right"></td>
      </tr>
      <tr class="stats">
          <td align="center">${!this.specialDamage ? "-": this.specialDamage }</td>
          <td></td>
          <td align="right"></td>
      </tr>
      `;
    }
  }

  // ConvertToHTML(){
  //     var div = this.ShieldStatBlock();
  //     div.addClass(`col-md-6 item item-${this.quality.toLowerCase()} my-4`);
  //     var inventory = select('#inventory');
  //     div.parent(inventory);
  // }

  RemoveHTML() {
    var inventoryHighlight = document.getElementById('inventory-highlight');
    if (inventoryHighlight.childNodes.length != 1) {
      var removeDiv = select('#item-highlight');
      removeDiv.remove();
    }

    var div = this.ShieldStatBlock();
    div.addClass(`col-md-12 item item-${this.quality.toLowerCase()} my-4`);
    div.id(`item-highlight`);

    var inventory = select('#inventory-highlight');
    div.parent(inventory);
  }
}

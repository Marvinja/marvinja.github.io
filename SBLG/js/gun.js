class Gun extends Item {
  constructor(playerLevel, quality, category) {
    super(playerLevel, quality, category);

    //Initialisation
    this.rangeLevel;
    this.range;
    this.rateOfFire;
    this.damageLevel;
    this.damage;
    this.ap;
    this.clipLevel = 0;
    this.initialClip;
    this.clip;
    this.strength;

    this.specialDamageType;
    this.specialDamage;
    this.incendiaryDamageLevel;

    //Improvement Variables
    this.aimLevel;
    this.aim;
    this.barrels;
    this.bayonetLevel = 0;
    this.bayonet;
    this.shootingModeLevel;
    this.shootingMode = []; this.shootingMode.length = 6;

    this.hinderances = []; this.hinderances.length = 2;
  }

  AddShootingMode(num) {
    let arr = ["Semi-automatic", "3 round burst", "Full auto - RoF 2", "Full auto - RoF 3", "Full auto - RoF 4", "Full auto - RoF 5"];
    this.shootingMode[num-1] = arr[num-1];
  }

//Setting Manufacturers
  SetBandit() {
      this.initialClip *= 2;
      this.clip = this.initialClip;
      if (this.category == "Rocket Launcher") {
          this.damageLevel --;
          this.damage = this.SetDamageRocket(this.damageLevel);
      }
  }
  SetDahl() {
      this.AddShootingMode(2);
  }
  SetHyperion() {
      this.specialProperties.push("Stability");
      this.specialProperties.push("penalties for shooting in full auto mode, or doing rapid attacks are reduced by one.");
  }
  SetJakobs() {
      //Damage
      this.damageLevel ++;
      if (this.category == "Shotgun") { this.SetDamageShotgun(this.damageLevel); }
      else if (this.prefix == "Grenade Launcher") { this.SetDamageGrenade(this.damageLevel); }
      else { this.damage = this.SetDamage(this.damageLevel); }
      //AP
      this.ap ++;
      //Revolver
      if (this.category != "Sniper") {
          this.specialProperties.push("Revolver");
          this.specialProperties.push("Jakobs weapons are considered as Revolvers. They can’t use semi-automatic and automatic guns manoeuvers such as double tap, three round burst and full auto, but can make rapid attacks.");
      }
      //Limited Ammo
      if (this.category != "Sniper") {
          this.initialClip = Math.floor(this.initialClip/2);
          this.clip = this.initialClip;
          this.hinderances[0] = "Limited Ammo";
          this.AddShootingMode(1);
      } else {
        this.initialClip -= 2;
        this.clip = this.initialClip;
      }

      this.initialClip = Math.floor(this.initialClip * 0.5);
  }
  SetMaliwan() {
      this.SetSpecialDamage(this.RollX(4));
      if (this.category == "Pistol") { this.hinderances[1] = "Low Rate of Fire"; }
  }
  SetTediore() {
      this.specialProperties.push("Special Reloading");
      this.specialProperties.push("to reload his weapon, the shooter must throw it like a grenade. This deals the same damage as shooting the weapon in a Small Burst Template. The action needed to throw it is combined to the one needed to reload and doesn’t add any further modifiers when calculating the multi-action penalty for the character’s turn.");
  }
  SetTorgue() {
      //Damage
      this.damageLevel ++;
      if (this.category == "Shotgun") { this.SetDamageShotgun(this.damageLevel); }
      else if (this.prefix == "Grenade Launcher") { this.SetDamageGrenade(this.damageLevel); }
      else if (this.category == "Rocket Launcher") { this.SetDamageRocket(this.damageLevel); }
      else { this.damage = this.SetDamage(this.damageLevel); }
      this.specialDamageType = "Explosive";
      this.rangeLevel --;
      this.range = this.SetRange(this.rangeLevel);
       this.hinderances[1] = "Low Rate of Fire";
  }
  SetVladof() {
      this.initialClip = Math.floor(this.initialClip * 1.5);
      this.shootingModeLevel ++;
      this.AddShootingMode(this.shootingModeLevel);


      if (this.prefix == "Droog") {
          this.AddShootingMode(3);
      }

      if (this.category == "Rocket Launcher") {
          this.initialClip *= 2;
          if (this.category = "Rocket Launcher") {
              this.damageLevel --;
              this.damage = this.SetDamageRocket(this.damageLevel);
          }
      }
  }


//Setting Stats
  SetAim(num) { return num == 1 ? 'Zoom' : 'Scope'; }

  SetBayonet(num) { return num == 1 ? "Bayonet (Str+d8)" : "Super-bayonet (Str+d10)"; }

  SetCritical(num) {
    let arr = ['d6', 'd8', 'd10', 'd12'];
    return arr[num-1];
  }

  SetDamage(num) {
    let arr = ["2d6-1", "2d6", "2d6+1", "2d8", "2d8+1", "2d10", "2d10+1", "2d12"];
    return arr[num-1];
  }
  SetDamageShotgun(num) {
    let arr = ["3d6/2d6/1d6", "3d6+1/2d6+1/1d6+1", "3d8/2d8/1d8"];
    return arr[num-1];
  }
  SetDamageGrenade(num) {
    let arr = ["3d6", "3d6+1", "3d6+2", "3d8", "3d8+1", "3d8+2", "3d10"];
    return arr[num-1];
  }
  SetDamageRocket(num) {
    let arr = ["2d10", "3d6", "3d6+1", "3d6+2", "3d8", "3d8+1", "3d8+2"];
    return arr[num-1];
  }

  SetRange(num) {
    let arr = ["2/4/8", "3/6/12", "5/10/20", "10/20/40", "12/24/48", "15/30/60", "20/40/80", "24/48/96", "30/60/120", "40/80/160", "50/100/200"];
    return arr[num-1];
  }

  SetSpecialDamage(num) {
    if (num == 1) { this.specialDamageType = "Corrosive"; this.specialDamage = 1; }
    if (num == 2) { this.specialDamageType = "Shock"; this.specialDamage = 1; }
    if (num == 3) { this.specialDamageType = "Incendiary"; this.incendiaryDamageLevel = 1; this.specialDamage = this.SetIncendiaryDamage(this.incendiaryDamageLevel); }
    if (num == 4) { this.specialDamageType = "Slag"; }
  }

  ShootingModeCount() {
      var count = 0;
      for (var i = 0; i < shootingMode.length; i ++) {
          if (this.shootingMode[i] != null) { count ++; }
      }
      return count;
  }

  ImproveClip(num) {
      if (num == 1) { this.clip = Math.floor(this.initialClip*1.5);}
      if (num == 2) { this.clip = Math.floor(this.initialClip*2);}
      if (num == 3) { this.clip = Math.floor(this.initialClip*3);}
  }

  CalculateAttackRoll(diceType, modifiers) {
    let roll = Math.floor(Math.random()*diceType + 1);
    console.log(roll);
    return roll === diceType ? roll + CalculateAttackRoll(diceType) + modifiers: roll;
  }

  CalculateDamageRoll(numOfDice, diceType, modifiers)  {
    let total = 0;
    let makeRoll = dt => {
      const roll = Math.floor(Math.random()*dt + 1);
      return roll == dt ? roll + makeRoll(dt) : roll;
    }
    for (let i = 0; i < numOfDice; i ++) {
      total += makeRoll(diceType);
    }
    return total + modifiers;
  }

  MakeAttack() {
    const diceTypes = ["d4", "d6", "d8", "d10", "d12"];
    let attackRollArr = [CalculateAttackRoll(6,0)];
    //Semi auto
    attackRollArr.push(CalculateAttackRoll(diceTypes[playerLevelArr.indexOf(this.playerLevel)]), 0);
    //3 Round Burst
    attackRollArr.push(CalculateAttackRoll(diceTypes[playerLevelArr.indexOf(this.playerLevel)]), 1);
    //Full Auto

  }
}

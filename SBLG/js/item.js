class Item {
  constructor(level, quality, category) {
    this.playerLevel = level;
    this.quality = quality;
    this.category = category;
    this.manufacturer;
    this.model;
    this.prefix;
    this.fullname;
    this.subPrefixArray = [];
    this.subPrefix;
    this.elementalSubPrefix;
    this.improvements = this.SetImprovements();
    this.improvementList = [];
    this.specialProperties = [];
    this.notes = "";
    this.id = this.GenerateID();
  }

  display(x, y) {
    fill(255);
    text(this.playerLevel, x, y);
    text(this.quality, x + 100, y);
    text(this.category, x + 200, y);
  }

  RollX(num) {
      return Math.floor(Math.random()*num + 1);
  }

  SetIncendiaryDamage(num) {
      if (num == 1) { return "1d4"; }
      if (num == 2) { return "1d4+1"; }
      if (num == 3) { return "1d6"; }
      if (num == 4) { return "1d6+1"; }
      if (num == 5) { return "1d8"; }
  }

  SetImprovements() {
      var numImprovements = 0;

      switch (this.playerLevel) {
          case "Novice": numImprovements += 0; break;
          case "Seasoned": numImprovements += 1; break;
          case "Veteran": numImprovements += 2; break;
          case "Heroic": numImprovements += 3; break;
          case "Legendary": numImprovements += 4; break;
      }

      switch (this.quality) {
          case "White": numImprovements += 0; break;
          case "Green": numImprovements += 1; break;
          case "Blue": numImprovements += 2; break;
          case "Purple": numImprovements += 3; break;
          case "Orange": numImprovements += 4; break;
      }

      return numImprovements;
  }

  GenerateID() {
    var id = "";
    var characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 20; i ++) {
      id += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return id;
  }

  AddItemBlock() {
      var parent = select("#item-blocks");
      var itemBlock = createDiv(
          `<a href="#inventory-highlight"><img src="./img/categories/${this.category} ${this.quality}.png" class="img-fluid m-4 mx-auto d-block" onclick="SetHighlight('${this.id}')"></a>`
      );
      itemBlock.addClass(`col-md-2 col-6 mt-4 item-background-${this.quality}`);
      itemBlock.attribute('tabindex', items.length);
      itemBlock.parent(parent);
  }
}

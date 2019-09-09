class Item {
  constructor(level, quality, category) {
    this.playerLevel = level;
    this.quality = quality;
    this.category = category;
    this.manufacturer;
    this.model;
    this.prefix;
    this.name;
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
      if (this.playerLevel == "Novice") { numImprovements += 0; }
      if (this.playerLevel == "Seasoned") { numImprovements += 1; }
      if (this.playerLevel == "Veteran") { numImprovements += 2; }
      if (this.playerLevel == "Heroic") { numImprovements += 3; }
      if (this.playerLevel == "Legendary") { numImprovements += 4; }

      if (this.quality == "White") { numImprovements += 0; }
      if (this.quality == "Green") { numImprovements += 1; }
      if (this.quality == "Blue") { numImprovements += 2; }
      if (this.quality == "Purple") { numImprovements += 3; }
      if (this.quality == "Orange") { numImprovements += 4; }

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

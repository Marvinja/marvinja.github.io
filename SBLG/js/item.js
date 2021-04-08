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
      let incendiaryArr = ["1d4", "1d4+1", "1d6", "1d6+1", "1d8"];
      return incendiaryArr[num+1];
  }

  SetImprovements() {
      return playerLevelArr.indexOf(this.playerLevel) + itemQualityArr.indexOf(this.quality);
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

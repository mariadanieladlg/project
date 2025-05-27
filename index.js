class Cat {
  constructor() {
    this.stage = 0; // 0: bebé, 1: joven, 2: adulto
    this.progress = 0;
    this.progressBar = document.getElementById("progressBar");
    this.catImage = document.getElementById("catImage");
    this.catStageText = document.getElementById("catStage");
    this.stages = [
      { name: "Baby", image: "./style/baby-cat.png" },
      { name: "Young", image: "./style/young-cat.png" },
      { name: "Adult", image: "./style/adult-cat.png" },
    ];
    this.actionsPerformed = new Set();
  }
  increaseProgress(amount = 1) {
    this.progress += amount;

    const maxProgress = this.stage < 2 ? 3 : 3; // mismo límite, pero no evoluciona si es adulto
    const progressPercent = Math.min((this.progress / 3) * 100, 100);

    this.progressBar.style.width = `${progressPercent}%`;

    if (this.progress >= 3 && this.stage < 2) {
      this.evolve();
    }
  }

  evolve() {
    this.stage++;
    this.progress = 3;
    this.progressBar.style.width = "100%";
    this.catImage.src = this.stages[this.stage].image;
    this.catStageText.textContent = `Stage: ${this.stages[this.stage].name}`;
    if (this.stage === 2) {
      this.actionsPerformed.clear();
    }
  }
}
class Upgrade {
  constructor(name, game) {
    this.name = name;
    this.game = game;
  }
  catAction() {
    this.game.cat.increaseProgress();
    if (this.game.cat.stage === 2) {
      this.game.cat.actionsPerformed.add(this.name);

      if (this.game.cat.actionsPerformed.size === 3) {
        document.getElementById("victoryMessage").style.display = "block";
      }
    }
  }
}
class Game {
  constructor() {
    this.cat = new Cat();
    this.brush = new Upgrade("pet", this);
    this.sushi = new Upgrade("feed", this);
    this.mouse = new Upgrade("play", this);
  }
}
const game = new Game();
function restartGame() {
  game.cat.stage = 0;
  game.cat.progress = 0;
  game.cat.catImage.src = game.cat.stages[0].image;
  game.cat.catStageText.textContent = `Stage: ${game.cat.stages[0].name}`;
  game.cat.progressBar.style.width = "0%";
  document.getElementById("restartButton").style.display = "none";
  document.getElementById("victoryMessage").classList.add("hidden");
}

document.getElementById("restartButton").addEventListener("click", () => {
  document.querySelector(".left").style.display = "none";
  document.getElementById("victoryMessage").style.display = "none";
  document.getElementById("eggContainer").style.display = "block";
});

document.getElementById("eggImage").addEventListener("click", () => {
  document.querySelector(".left").style.display = "block";
  document.getElementById("eggContainer").style.display = "none";
  game.cat = new Cat(); // reinicia el gato
});

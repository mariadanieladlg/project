class Cat {
  constructor() {
    this.stage = 0;
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

    this.progress = Math.max(0, Math.min(this.progress, 3));
    const progressPercent = (this.progress / 3) * 100;
    this.progressBar.style.width = `${progressPercent}%`;

    if (this.progress === 0) {
      document.getElementById(
        "victoryMessage"
      ).innerHTML = `💔 Oh no! The cat is sad.💔 <br> You overstimulated it. <br> Choose the right combination of inputs to help it grow. <br><br>
  <button onclick="window.location.reload()" class="retry-button">🔄 Try Again 🔄</button>`;
      document.getElementById("victoryMessage").style.display = "block";

      game.isGameOver = true;
      return;
    }

    if (this.progress >= 3 && this.stage < 2) {
      this.evolve();
    }
  }

  evolve() {
    this.stage++;
    this.progress = 0;
    this.progressBar.style.width = "0%";
    this.catImage.src = this.stages[this.stage].image;
    this.catStageText.textContent = `Stage: ${this.stages[this.stage].name}`;
    if (this.stage === 2) {
      this.actionsPerformed.clear();
    }
  }
}

class Upgrade {
  constructor(name, game, effect = 1) {
    this.name = name;
    this.game = game;
    this.effect = effect;
  }

  catAction() {
    if (this.game.isGameOver) return;
    this.game.cat.increaseProgress(this.effect);

    if (this.effect > 0 && this.game.cat.stage === 2) {
      this.game.cat.actionsPerformed.add(this.name);

      if (this.game.cat.actionsPerformed.size === 3) {
        const messageBox = document.getElementById("victoryMessage");
        messageBox.innerHTML = `
  🎉 Congrats! You have raised the happiest cat in the world 🐱💖<br><br>
  <button onclick="window.location.reload()" class="retry-button">🔄 Play Again 🔄</button>
`;
        messageBox.style.display = "block";
        this.game.isGameOver = true;
      }
    }
  }
}

class Game {
  constructor() {
    this.cat = new Cat();
    this.isGameOver = false;

    this.brush = new Upgrade("pet", this, 0.5);
    this.sushi = new Upgrade("feed", this, 0.5);
    this.mouse = new Upgrade("play", this, 0.5);

    this.milk = new Upgrade("milk", this, -0.2);
    this.shower = new Upgrade("shower", this, -0.2);
    this.laser = new Upgrade("laser", this, -0.2);
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

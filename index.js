let gem = document.querySelector(".gem-cost");
let parsedGem = parseFloat(gem.innerHTML);

let clickerCost = document.querySelector(".clicker-cost");
let parsedClickerCost = parseFloat(clickerCost.innerHTML);
let clickerLevel = document.querySelector(".clicker-level");
let clickerIncrease = document.querySelector(".clicker-increase");
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML);

let sushiCost = document.querySelector(".sushi-cost");
let parsedSushiCost = parseFloat(sushiCost.innerHTML);
let sushiLevel = document.querySelector(".sushi-level");
let sushiIncrease = document.querySelector(".sushi-increase");
let parsedSushiIncrease = parseFloat(sushiIncrease.innerHTML);

let mouseCost = document.querySelector(".mouse-cost");
let parsedMouseCost = parseFloat(mouseCost.innerHTML);
let mouseLevel = document.querySelector(".mouse-level");
let mouseIncrease = document.querySelector(".mouse-increase");
let parsedMouseIncrease = parseFloat(mouseIncrease.innerHTML);

let gpcText = document.getElementById("gpc-text");
let gpsText = document.getElementById("gps.text");

let gpc = 1;

let gps = 0;

function incrementGem() {
  gem.innerHTML = Math.round((parsedGem += gpc));
}

function buyClicker() {
  if (parsedGem >= parsedClickerCost) {
    gem.innerHTML = Math.round((parsedGem -= parsedClickerCost));

    clickerLevel.innerHTML++;

    parsedClickerIncrease = parseFloat(
      (parsedClickerIncrease * 1.03).toFixed(2)
    );
    clickerIncrease.innerHTML = parsedClickerIncrease;
    gpc += parsedClickerIncrease;

    parsedClickerCost *= 1.18;
    clickerCost.innerHTML = Math.round(parsedClickerCost);
  }
}

function buySushi() {
  if (parsedGem >= parsedSushiCost) {
    gem.innerHTML = Math.round((parsedGem -= parsedSushiCost));

    sushiLevel.innerHTML++;

    parsedSushiIncrease = parseFloat((parsedSushiIncrease * 1.03).toFixed(2));
    sushiIncrease.innerHTML = parsedSushiIncrease;
    gps += parsedSushiIncrease;

    parsedSushiCost *= 1.18;
    sushiCost.innerHTML = Math.round(parsedSushiCost);
  }
}

function buyMouse() {
  if (parsedGem >= parsedMouseCost) {
    gem.innerHTML = Math.round((parsedGem -= parsedMouseCost));

    mouseLevel.innerHTML++;

    parsedMouseIncrease = parseFloat((parsedMouseIncrease * 1.03).toFixed(2));
    mouseIncrease.innerHTML = parsedMouseIncrease;
    gps += parsedMouseIncrease;

    parsedMouseCost *= 1.18;
    mouseCost.innerHTML = Math.round(parsedMouseCost);
  }
}

setInterval(() => {
  parsedGem += gps / 10;
  gem.innerHTML = Math.round(parsedGem);
  gpcText.innerHTML = Math.round(gpc);
  gpsText.innerHTML = Math.round(gps);
}, 100);

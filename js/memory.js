const gridContainer = document.querySelector(".grid-container");
const timer = document.getElementById("timer");

const TIME_WEIGHT = 100; // Points per second
const MOVES_WEIGHT = 10; // Points per move

let cards = [],
cardCount,
flipCarsCount = 0, 
firstCard, secondCard, 
lockBoard = false,
moves = 0,
sec = 0,
score = 0,
setTimer,
difficultyMultiplier = 1.0; // for the score

timer.innerText = "0";

document.querySelector(".moves").textContent = moves;
document.querySelector("button").addEventListener("click", restart);

const difficulty = localStorage.getItem("difficulty");
const currentUser = getUserFromCookie();
const canvas = document.getElementById("my-canvas");
const popup = document.querySelector('.popup');
const displayScore = document.querySelector('#displayScore');


switch (difficulty) {
  case "easy":
    gridContainer.classList.add("easy");
    cardCount = 3;
	difficultyMultiplier = 1.0;
    break;
  case "medium":
    gridContainer.classList.add("medium");
    cardCount = 4;
	difficultyMultiplier = 1.5;
    break;
  case "hard":
    gridContainer.classList.add("hard");
    cardCount = 8;
	difficultyMultiplier = 2.0;
    break;
  default:
    gridContainer.classList.add("medium");
    cardCount = 4;
}

fetch("/json/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = data.slice(0, cardCount);
    cards = [...cards, ...cards];
    setTime();
    shuffleCards();
    generateCards();
  });

function setTime() {
  gridContainer.addEventListener("click", function clickOnce() {
    clearInterval(setTimer);
    setTimer = setInterval(stopwatch, 1000);
    gridContainer.removeEventListener("click", clickOnce);
  });
}

function shuffleCards() {
  let currentIndex = cardCount,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  var audio = new Audio('/img/76271.mp3'); // Provide the path to your sound file
  audio.play();

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  document.querySelector(".moves").textContent = moves;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  if (isMatch) {
    disableCards();
    flipCarsCount++;
    if (flipCarsCount === cardCount) {
      endGame();
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  window.location.href = "/html/difficulty.html";
}

function stopwatch() {
  sec += 1;
  if (sec < 60) {
    timer.innerText = sec;
  } else if (sec < 3600) {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    timer.innerText = minutes + ":" + seconds;
  }
}

function calcMemoryScore() {
  // Calculate score for time (in seconds)
  const timeScore = Math.floor((1 / sec) * TIME_WEIGHT);

  // Calculate score for moves
  const movesScore = (10 / moves) * MOVES_WEIGHT;

  // Calculate total score
  score = Math.floor((timeScore + movesScore) * difficultyMultiplier) * 10;
}

const jsConfetti = new JSConfetti();

function endGame() {
  clearInterval(setTimer);
  calcMemoryScore();
  addScore("memory", currentUser.userName, score);
  popup.classList.add('active');
  displayScore.textContent = `You did it!!!
  Your Score is: ${score}`;
  jsConfetti.addConfetti().then(() => jsConfetti.addConfetti());
}

document.querySelector(".close").addEventListener("click", function close(){
	popup.classList.remove("active");
});
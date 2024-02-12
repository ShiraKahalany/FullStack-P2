const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
const currentUser = getUserFromCookie();
let score = 0;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked)); // Remove parentheses after cellClicked
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex"); //get the clicked cellIndex

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();

  if (running) {
    setTimeout(computerMove, 500);
  }
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  score = 0;
}

function computerMove() {
  const availableCells = [];
  options.forEach((option, index) => {
    if (option === "") {
      availableCells.push(index);
    }
  });

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const cellIndex = availableCells[randomIndex];

  const cell = cells[cellIndex];
  updateCell(cell, cellIndex);
  checkWinner();
}


const jsConfetti = new JSConfetti();

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    running = false;
    if (currentPlayer === "X") {
      score = 900 - ((options.filter((option) => option === "X").length) * 100);
      addScore("ticTacToe", currentUser.userName, score);
      statusText.textContent = `${currentPlayer} wins! Your Score: ${score}`;
      jsConfetti.addConfetti().then(() => jsConfetti.addConfetti());
    }
    else{
      statusText.textContent = `${currentPlayer} wins!`;
    }
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
    running = false;
  } else {
    changePlayer();
  }
}
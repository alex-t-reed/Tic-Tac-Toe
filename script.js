
let currentPlayer = "x";
const board = document.getElementById("board");
const status = document.getElementById("status");
const audioX = new Audio("x-sound.mp3");
const audioO = new Audio("o-sound.mp3");
const bgMusic = new Audio("bg-music.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.2;
bgMusic.play();

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => makeMove(cell), { once: true });
    board.appendChild(cell);
  }
  status.innerText = "Your turn: X";
}

function makeMove(cell) {
  if (cell.classList.contains("x") || cell.classList.contains("o")) return;
  cell.classList.add(currentPlayer);
  if (currentPlayer === "x") {
    audioX.play();
  } else {
    audioO.play();
  }

  if (checkWin(currentPlayer)) {
    status.innerText = (currentPlayer.toUpperCase()) + " wins!";
    disableBoard();
    return;
  }

  if (isDraw()) {
    status.innerText = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
  status.innerText = "Your turn: " + currentPlayer.toUpperCase();
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.replaceWith(cell.cloneNode(true)); // remove all event listeners
  });
}

function isDraw() {
  return [...document.querySelectorAll(".cell")].every(cell =>
    cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function checkWin(player) {
  const cells = document.querySelectorAll(".cell");
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    if (pattern.every(i => cells[i].classList.contains(player))) {
      pattern.forEach(i => {
        cells[i].classList.add("fire");
      });
      return true;
    }
    return false;
  });
}

function resetGame() {
  currentPlayer = "x";
  createBoard();
}

createBoard();

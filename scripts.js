const boardTable = document.querySelector('.board');
const gameOverDialog = document.querySelector('.game-over-dialog');
const gameOverMessage = gameOverDialog.querySelector('.game-over-message');
const restartButton = gameOverDialog.querySelector('.restart-button');

boardTable.addEventListener('click', setPlayerMove);
restartButton.addEventListener('click', startGame);

let currentPlayer, winner, isGameOver, turn;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  currentPlayer = 'X';
  winner = null;
  isGameOver = false;
  turn = 0;
  boardTable.style.setProperty('--current-player', '"X"');
  hideGameOverDialog();
  clearBoard();
}

function clearBoard() {
  boardTable.querySelectorAll('.cell').forEach((cell) => (cell.innerText = '')); // limpar table
}

function setPlayerMove({ target }) {
  // clicar na cell e mudar jogador
  if (
    !isGameOver &&
    target.classList.contains('cell') &&
    target.innerText === ''
  ) {
    target.innerText = currentPlayer;
    turn++;
    if (turn > 4) {
      checkGameOver();
    }
    togglePlayer();
  }
}

function togglePlayer() {
  //muda jogador
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  boardTable.style.setProperty('--current-player', `"${currentPlayer}"`);
}

function checkGameOver() {
  winner = checkWinner();

  if (winner) {
    showGameOverDialog(`Vitória do ${winner}`);
  } else if (turn > 8) {
    showGameOverDialog(`Deu Velha!`);
  }
}

function checkWinner() {
  // vai pegar os X e O da partda e checar nas posicoes, depois ver se tem ganhador
  let cells = boardTable.querySelectorAll('.cell');
  cells = Array.from(cells).map((element) => element.innerText); // array com todos os conteudos da tabela
  const values = winningConditions.map((condition) =>
    condition.map((position) => cells[position]).join('')
  );

  const isOWinner = values.includes('OOO');
  const isXWinner = values.includes('XXX');

  if (isOWinner || isXWinner) {
    isGameOver = true;
    if (isOWinner) {
      return 'O';
    }
    return 'X';
  }
  return null;
}

function showGameOverDialog(message) {
  gameOverMessage.innerText = message;
  gameOverDialog.setAttribute('open', 'true');
}

function hideGameOverDialog() {
  gameOverDialog.removeAttribute('open');
}

startGame();

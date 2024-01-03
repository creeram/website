const board = document.getElementById('board');
let currentPlayer = 'X';
let gameOver = false;

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    if (gameOver) return;

    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');

    if (!isValidMove(index)) return;

    makeMove(clickedCell, index);

    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        gameOver = true;
    } else if (isBoardFull()) {
        alert('It\'s a draw!');
        gameOver = true;
    } else {
        switchPlayer();
    }
}

function isValidMove(index) {
    const cell = board.children[index];
    return cell.innerText === '';
}

function makeMove(cell, index) {
    cell.innerText = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination =>
        combination.every(index =>
            board.children[index].innerText === currentPlayer
        )
    );
}

function isBoardFull() {
    return Array.from(board.children).every(cell => cell.innerText !== '');
}


// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const gameOverDisplay = document.getElementById('game-over');
    const restartButton = document.getElementById('restart-button');
    const width = 4;
    let squares = [];
    let score = 0;

    // Create board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div');
            square.classList.add('tile');
            square.innerHTML = '';
            gameBoard.appendChild(square);
            squares.push(square);
        }
        generateNumber();
        generateNumber();
    }

    // Generate a number (2 or 4) in a random empty square
    function generateNumber() {
        let emptySquares = squares.filter(square => square.innerHTML == '');
        if (emptySquares.length > 0) {
            let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
            randomSquare.innerHTML = Math.random() > 0.1 ? 2 : 4;
            applyTileStyles(randomSquare);
            checkForGameOver();
        }
    }

    function applyTileStyles(square) {
        const tileValue = parseInt(square.innerHTML);
        square.className = 'tile';
        if (tileValue) {
            square.classList.add(`tile-${tileValue}`);
        }
    }

    function updateBoard() {
        squares.forEach(applyTileStyles);
    }

    // Swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML) || 0,
                    parseInt(squares[i + 1].innerHTML) || 0,
                    parseInt(squares[i + 2].innerHTML) || 0,
                    parseInt(squares[i + 3].innerHTML) || 0
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0] === 0 ? '' : newRow[0];
                squares[i + 1].innerHTML = newRow[1] === 0 ? '' : newRow[1];
                squares[i + 2].innerHTML = newRow[2] === 0 ? '' : newRow[2];
                squares[i + 3].innerHTML = newRow[3] === 0 ? '' : newRow[3];
            }
        }
        updateBoard();
    }

    // Swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML) || 0,
                    parseInt(squares[i + 1].innerHTML) || 0,
                    parseInt(squares[i + 2].innerHTML) || 0,
                    parseInt(squares[i + 3].innerHTML) || 0
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0] === 0 ? '' : newRow[0];
                squares[i + 1].innerHTML = newRow[1] === 0 ? '' : newRow[1];
                squares[i + 2].innerHTML = newRow[2] === 0 ? '' : newRow[2];
                squares[i + 3].innerHTML = newRow[3] === 0 ? '' : newRow[3];
            }
        }
        updateBoard();
    }

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + width].innerHTML) || 0,
                parseInt(squares[i + (width * 2)].innerHTML) || 0,
                parseInt(squares[i + (width * 3)].innerHTML) || 0
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0] === 0 ? '' : newColumn[0];
            squares[i + width].innerHTML = newColumn[1] === 0 ? '' : newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2] === 0 ? '' : newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3] === 0 ? '' : newColumn[3];
        }
        updateBoard();
    }

    // Swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + width].innerHTML) || 0,
                parseInt(squares[i + (width * 2)].innerHTML) || 0,
                parseInt(squares[i + (width * 3)].innerHTML) || 0
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0] === 0 ? '' : newColumn[0];
            squares[i + width].innerHTML = newColumn[1] === 0 ? '' : newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2] === 0 ? '' : newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3] === 0 ? '' : newColumn[3];
        }
        updateBoard();
    }

    // Combine numbers in row
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
        updateBoard();
    }

    // Combine numbers in column
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
        updateBoard();
    }

    // Assign functions to keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generateNumber();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generateNumber();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generateNumber();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generateNumber();
    }

    // Check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                gameOverDisplay.querySelector('p').innerText = 'You Win!';
                gameOverDisplay.classList.remove('hidden');
                document.removeEventListener('keyup', control);
            }
        }
    }

    // Check for no available moves
    // function checkForGameOver() {
    //     let emptySquares = squares.filter(square => square.innerHTML == '');
    //     if (emptySquares.length === 0) {
    //         gameOverDisplay.classList.remove('hidden');
    //         document.removeEventListener('keyup', control);
    //     }
    // }

    // Check for no available moves
    function checkForGameOver() {
        let emptySquares = squares.filter(square => square.innerHTML == '');
        if (emptySquares.length === 0) {
            for (let i = 0; i < width * width; i++) {
                if ((i % width !== width - 1 && squares[i].innerHTML === squares[i + 1].innerHTML) || // check right
                    (i < width * (width - 1) && squares[i].innerHTML === squares[i + width].innerHTML)) { // check down
                    return; // if any adjacent squares have the same number, return early
                }
            }
            gameOverDisplay.classList.remove('hidden');
            document.removeEventListener('keyup', control);
        }
    }


    // Restart game
    restartButton.addEventListener('click', () => {
        gameBoard.innerHTML = '';
        squares = [];
        score = 0;
        scoreDisplay.innerHTML = score;
        gameOverDisplay.classList.add('hidden');
        createBoard();
        document.addEventListener('keyup', control);
    });

    createBoard();
});

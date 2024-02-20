document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const player1Character = urlParams.get('player1');
    const player2Character = urlParams.get('player2');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let gameActive = true;
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    
        [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.id.split('-')[1]);
    
        if (cell.textContent === '' && gameActive) {
            const imgSrc = currentPlayer === 'X' ? player1Character : player2Character;
            cell.style.backgroundImage = `url(img/${imgSrc}.jpeg)`;
            cell.style.backgroundSize = 'cover';
            cell.classList.add('cell-occupied');
            if (checkWin(currentPlayer)) {
                endGame(false);
            } else if (checkDraw()) {
                endGame(true);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateTurnIndicator();
                playClickSound();
            }
        }
    }

    function checkWin(player) {
        return winningCombos.some(combination => {
            return combination.every(index => {
                const cell = cells[index];
                const imgSrc = player === 'X' ? player1Character : player2Character;
                const backgroundImage = cell.style.backgroundImage;
                return backgroundImage.includes(`img/${imgSrc}.jpeg`);
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('cell-occupied');
        });
    }

    function endGame(draw) {
        if (draw) {
            showModal('¡Empate!');
            window.location.href = `play.html`;
        } else {
            const winnerImage = currentPlayer === 'X' ? player1Character : player2Character;
            window.location.href = `winner.html?winner=${winnerImage}`;
        }
        gameActive = false;
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundImage = '';
            cell.classList.remove('cell-occupied');
        });
        currentPlayer = 'X';
        gameActive = true;
        updateTurnIndicator();
    }

    function updateTurnIndicator() {
        const turnIndicator = document.getElementById('turn-indicator');
        if (turnIndicator) {
            turnIndicator.textContent = 'Turno de: ' + currentPlayer;
        }
    }

    function playClickSound() {
        // Reproducir sonido de clic
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', function() {
        resetGame();
    });

    updateTurnIndicator();
});

function showModal(message) {
    alert(message); // Usamos alert en lugar de un modal para simplificar, pero podrías usar un modal aquí
}

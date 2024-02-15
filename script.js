document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const modal = document.getElementById('myModal');
    const startButton = document.getElementById('start-game');
    const player1Select = document.getElementById('player1-character');
    const player2Select = document.getElementById('player2-character');
    let currentPlayer = 'X';
    let gameActive = false;
    let player1Character = '';
    let player2Character = '';
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
            return cell.textContent !== '';
        });
    }

    function endGame(draw) {
        if (draw) {
            showModal('¡Empate!');
        } else {
            const winnerImage = currentPlayer === 'X' ? player1Character : player2Character;
            document.getElementById('winner-image').src = `img/${winnerImage}.jpeg`;
            document.getElementById('winner-image').style.display = 'block';
            showModal(`¡Ganó el jugador ${currentPlayer}!`);
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

    // Abre el modal al cargar la página
    modal.style.display = 'block';

    // Cierra el modal cuando se hace clic en la X
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
        modalContent.removeChild(modalMessage); // Limpiar el mensaje del modal
        resetGame(); // Reiniciar el juego después de cerrar el modal
    });

    // Cierra el modal y comienza el juego cuando se hace clic en el botón de comenzar
    startButton.addEventListener('click', function() {
        modal.style.display = 'none';
        player1Character = player1Select.value;
        player2Character = player2Select.value;
        gameActive = true;
        updateTurnIndicator();
    });

    updateTurnIndicator();
});

function showModal(message) {
    const modal = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content');
    const modalMessage = document.createElement('p');
    modalMessage.textContent = message;
    modalContent.appendChild(modalMessage);
    modal.style.display = 'block';

    // Cierra el modal cuando se hace clic en la X
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
        modalContent.removeChild(modalMessage); // Limpiar el mensaje del modal
    });
}

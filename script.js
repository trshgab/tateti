document.addEventListener('DOMContentLoaded', function() {
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
            cell.textContent = currentPlayer;
            cell.classList.add('animate-highlight'); // Agregar animación
            if (checkWin(currentPlayer)) {
                endGame(false);
            } else if (checkDraw()) {
                endGame(true);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateTurnIndicator(); // Actualizar indicador de turno
                playClickSound(); // Reproducir sonido de clic
            }
        }
    }

    function checkWin(player) {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
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
            alert('¡Empate!');
        } else {
            alert('¡Ganó el jugador ' + currentPlayer + '!');
        }
        gameActive = false;
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('animate-highlight'); // Quitar animación
        });
        currentPlayer = 'X';
        gameActive = true;
        updateTurnIndicator(); // Restablecer indicador de turno
    }

    function updateTurnIndicator() {
        const turnIndicator = document.getElementById('turn-indicator');
        turnIndicator.textContent = 'Turno de: ' + currentPlayer;
    }

    function playClickSound() {
        const clickSound = new Audio('click-sound.mp3');
        clickSound.play();
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', function() {
        resetGame();
        resetButton.classList.add('animate-shake'); // Agregar animación de shake al reiniciar
        setTimeout(() => {
            resetButton.classList.remove('animate-shake'); // Quitar animación después de 500ms
        }, 500);
    });

    updateTurnIndicator(); // Inicializar indicador de turno al cargar la página
});

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
            const imgSrc = currentPlayer === 'X' ? 'img/gab.jpeg' : 'img/santi.jpeg';
            cell.style.backgroundImage = `url(${imgSrc})`;
            cell.style.backgroundSize = 'cover'; // Ajuste para que la imagen cubra todo el fondo
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
                return cells[index].style.backgroundImage.includes(player === 'X' ? 'gab.jpeg' : 'santi.jpeg');
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
            cell.style.backgroundImage = ''; // Eliminar la imagen de fondo
            cell.classList.remove('cell-occupied');
        });
        currentPlayer = 'X';
        gameActive = true;
        updateTurnIndicator();
    }

    function updateTurnIndicator() {
        const turnIndicator = document.getElementById('turn-indicator');
        turnIndicator.textContent = 'Turno de: ' + currentPlayer;
    }

    function playClickSound() {
        // Supongamos que tienes un archivo de sonido llamado 'click-sound.mp3' en tu proyecto
        // Puedes reproducir el sonido aquí
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', function() {
        resetGame();
    });

    updateTurnIndicator();
});

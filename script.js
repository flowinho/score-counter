const legendsPlayer1 = document.getElementById('legends-player-1');
const legendsPlayer2 = document.getElementById('legends-player-2');

const increasePlayer1 = document.getElementById('increase-player-1');
const decreasePlayer1 = document.getElementById('decrease-player-1');

const increasePlayer2 = document.getElementById('increase-player-2');
const decreasePlayer2 = document.getElementById('decrease-player-2');

const timerDisplay = document.getElementById('timer-display');
const timerDuration = document.getElementById('timer-duration');
const startTimerButton = document.getElementById('start-timer');
const resetTimerButton = document.getElementById('reset-timer');
const resetRoundButton = document.getElementById('reset-round');
const resetLoreButton = document.getElementById('reset-lore');
const timerElement = document.getElementById('timer');

let timerInterval;
let remainingTime = 45 * 60;

for (let i = 1; i <= 60; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} Minuten`;
    if (i === 45) option.selected = true;
    timerDuration.appendChild(option);
}

timerDuration.addEventListener('change', () => {
    remainingTime = parseInt(timerDuration.value) * 60;
    timerDisplay.textContent = formatTime(remainingTime);
    updateTimerColor();
});

let legends1 = 0;
let legends2 = 0;

legendsPlayer1.textContent = legends1;
legendsPlayer2.textContent = legends2;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

function updateTimerColor() {
    const remainingMinutes = remainingTime / 60;
    if (remainingMinutes <= 15) {
        timerElement.style.background = "linear-gradient(to bottom, #3d0000, #550000)";
    } else if (remainingMinutes <= 30) {
        timerElement.style.background = "linear-gradient(to bottom, #554400, #775500)";
    } else {
        timerElement.style.background = "linear-gradient(to bottom, #003d00, #005500)";
    }
    timerElement.style.color = "#ffffff";
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    remainingTime = parseInt(timerDuration.value) * 60;
    timerDisplay.textContent = formatTime(remainingTime);

    legends1 = legends2 = 0;
    legendsPlayer1.textContent = legends1;
    legendsPlayer2.textContent = legends2;

    updateTimerColor();

    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            timerDisplay.textContent = formatTime(remainingTime);
            updateTimerColor();
        } else {
            clearInterval(timerInterval);
            alert('Die Zeit ist abgelaufen!');
        }
    }, 1000);
}

function resetTimer() {
    if (timerInterval) clearInterval(timerInterval);
    remainingTime = 45 * 60;
    timerDisplay.textContent = formatTime(remainingTime);
    updateTimerColor();
}

function updateLegends(player, value) {
    if (player === 1) {
        legends1 = value;
        legendsPlayer1.textContent = legends1;
    } else if (player === 2) {
        legends2 = value;
        legendsPlayer2.textContent = legends2;
    }
}

function resetRound() {
    resetTimer();
    legends1 = legends2 = 0;
    legendsPlayer1.textContent = legends1;
    legendsPlayer2.textContent = legends2;
}

function resetLore() {
    legends1 = legends2 = 0;
    legendsPlayer1.textContent = legends1;
    legendsPlayer2.textContent = legends2;
}

increasePlayer1.addEventListener('click', () => updateLegends(1, legends1 + 1));
decreasePlayer1.addEventListener('click', () => updateLegends(1, legends1 - 1));

increasePlayer2.addEventListener('click', () => updateLegends(2, legends2 + 1));
decreasePlayer2.addEventListener('click', () => updateLegends(2, legends2 - 1));

startTimerButton.addEventListener('click', startTimer);
resetTimerButton.addEventListener('click', resetTimer);
resetRoundButton.addEventListener('click', resetRound);
resetLoreButton.addEventListener('click', resetLore);

updateTimerColor();

let workTime = 25 * 60;
let breakTime = 5 * 60;
let timer = workTime;
let isRunning = false;
let interval;

const timerDisplay = document.getElementById('timer');
const sessionTypeDisplay = document.getElementById('session-type');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timer);
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        interval = setInterval(() => {
            if (timer > 0) {
                timer--;
                updateTimerDisplay();
            } else {
                clearInterval(interval);
                isRunning = false;
                startPauseBtn.textContent = 'Start';
                if (sessionTypeDisplay.textContent === 'Studying Session') {
                    sessionTypeDisplay.textContent = 'Break Session';
                    timer = breakTime;
                } else {
                    sessionTypeDisplay.textContent = 'Studying Session';
                    timer = workTime;
                }
                updateTimerDisplay();
            }
        }, 1000);
    } else {
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        clearInterval(interval);
    }
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    sessionTypeDisplay.textContent = 'Studying Session';
    timer = workTime;
    updateTimerDisplay();
}

startPauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
updateTimerDisplay();
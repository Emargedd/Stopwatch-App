let startTime, updatedTime, difference, interval;
let isRunning = false;
let totalTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const recordList = document.getElementById('recordList');

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);

    return (
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
    );
}

function updateDisplay() {
    difference = Date.now() - startTime;
    display.textContent = formatTime(difference + totalTime);
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now();
        interval = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        totalTime += Date.now() - startTime;
        isRunning = false;
    }
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        totalTime += Date.now() - startTime;
        isRunning = false;
    }
    addRecord(formatTime(totalTime));
    totalTime = 0;
    display.textContent = "00:00:00";
});

resetButton.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    totalTime = 0;
    display.textContent = "00:00:00";
});

function addRecord(record) {
    let listItem = document.createElement('li');
    listItem.textContent = record;
    recordList.appendChild(listItem);

    // Send the record to the server
    fetch('/saveRecord', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ record })
    });
}

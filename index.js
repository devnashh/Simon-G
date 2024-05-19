let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const sounds = {
    green: new Audio('red.wav'),
    red: new Audio('red.wav'),
    yellow: new Audio('red.wav'),
    blue: new Audio('red.wav'),
    wrong: new Audio('gameOver.wav')
};

document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
    if (!started) {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = true;
        document.getElementById("level-title").textContent = `Level ${level}`;
        document.getElementById("start-btn").style.display = "none";
        nextSequence();
    }
}

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", handleUserInput);
    button.addEventListener("touchstart", handleUserInput);
});

function handleUserInput(event) {
    if (started) {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = `Level ${level}`;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    document.getElementById(randomChosenColor).classList.add("flash");
    setTimeout(() => {
        document.getElementById(randomChosenColor).classList.remove("flash");
    }, 100);
    playSound(randomChosenColor);
}

function playSound(name) {
    sounds[name].play();
}

function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(currentColor).classList.remove("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        document.getElementById("level-title").textContent = "Game Over, Press Start to Restart";
        document.getElementById("start-btn").style.display = "block";
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

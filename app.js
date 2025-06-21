let gameSeq = [];
let userSeq = [];
let highScore = localStorage.getItem("simonHighScore") || 0; 
// This gets the saved high score from the browser
let btns = ["yellow", "red", "purple", "green"];

let started = false; 
let level = 0; 

let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("high-score");


highScoreDisplay.innerText = `High Score: ${highScore}`;
// This sets the text of the high score display to the current high score.

document.addEventListener("keypress", function () {
    // console.log("The Game has started");
    if (started == false) {
        console.log("The Game has started");
        started = true; // game shuru ho gaya

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash"); // button ko flash karo
    setTimeout(function () {
        btn.classList.remove("flash"); // button ka flash hatao
    }, 300); // 1s ke baad flash hatao
}

function userFlash(btn) {
    btn.classList.add("userflash"); // button ko flash karo
    setTimeout(function () {
        btn.classList.remove("userflash"); // button ka flash hatao
    }, 300); // 1s ke baad flash hatao
}

function levelUp() {
    userSeq = []; // user sequence  khali 
    level++; // level ko 1 se badhao
    h2.innerText = `Level ${level}`; // h2 ka text level ke saath update karo

    // rando btn choose 
    let randIdx = Math.floor(Math.random() * btns.length); // 0 se 3 tak random number
    let randColor = btns[randIdx]; // random color choose karo
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor); // game sequence me random color add karo
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log("curr level : ", level);
    // let idx = level - 1;

    if (userSeq[idx] == gameSeq[idx]) {
        // console.log("same value");
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Agar user galat ho gaya
        if (level > highScore) { // Kya current score high score se zyada hai?
            highScore = level; // High score ko update karo
            localStorage.setItem("simonHighScore", highScore); // Browser me save karo
            highScoreDisplay.innerText = `High Score: ${highScore}`; // Screen pe dikhayo
        }
        h2.innerHTML = `Game Over ! Your Score was <b>${level}</b> <br> Press Any to Start the Game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this; // jo button press hua hai usko select karo
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor); // user sequence me color add 
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn"); // sabhi buttons ko select karo
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset()  {
    started = false; // game shuru nahi hua
    gameSeq = []; // game sequence khali 
    userSeq = []; // user sequence khali
    level = 0; // level 0
    highScoreDisplay.innerText = `High Score: ${highScore}`; // Always show latest high score
}


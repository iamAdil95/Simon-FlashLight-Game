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

document.addEventListener("keypress", function () { 
    if (started == false) {
        console.log("The Game has started");
        started = true; 
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash"); 
    setTimeout(function () {
        btn.classList.remove("flash"); 
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash"); 
    setTimeout(function () {
        btn.classList.remove("userflash"); 
    }, 300); 
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`; 

    // rando btn choose 
    let randIdx = Math.floor(Math.random() * btns.length); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
   
    gameSeq.push(randColor); 
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    
    if (userSeq[idx] == gameSeq[idx]) {
        // console.log("same value");
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
      
        if (level > highScore) { 
            highScore = level; 
            localStorage.setItem("simonHighScore", highScore); 
            highScoreDisplay.innerText = `High Score: ${highScore}`; 
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
   
    let btn = this; 
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor); 
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn"); /
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset()  {
    started = false; /
    gameSeq = [];
    userSeq = []; 
    level = 0; 
    highScoreDisplay.innerText = `High Score: ${highScore}`; 
}


let gameseq = [];
let userseq = [];
let btns = ["yellow","red","purple","blue"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let highscrdspl = document.getElementById("high-score");
let highscr = localStorage.getItem("highscr") || 0;
highscrdspl.textContent = highscr;

document.addEventListener("keypress", function () {
  if(started == false) {
    started = true;
    levelUp();
  }
});

function updthgscr(score) {
  if(score > highscr) {
    highscr = score;
    localStorage.setItem("highscr",highscr);
    highscrdspl.textContent = highscr;
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() { 
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let rndmInd = Math.floor(Math.random()*4); // Changed to randomize over all buttons
  let rndmclr = btns[rndmInd];
  let rndmbtn = document.querySelector(`.${rndmclr}`);
  gameseq.push(rndmclr);
  console.log(gameseq);
  gameFlash(rndmbtn);
}

function checkAns(idx) {
  if(userseq[idx] === gameseq[idx]) {
    if(userseq.length == gameseq.length) {
      setTimeout(levelUp,1000);
    }
  } else {
    h2.innerHTML = `<h1>Game Over!</h1> Your score: <b>${level}</b> <br>Press any key to Restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    updthgscr(level); // Call to update high score
    reset();
  }
}

function btnpress() {
  let btn = this;
  userFlash(btn);
  userclr = btn.getAttribute("id");
  userseq.push(userclr);
  checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns) {
  btn.addEventListener("click",btnpress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

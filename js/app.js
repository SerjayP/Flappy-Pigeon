const game = document.querySelector("#game");
const pipe = document.querySelector("#pipe1");
const opening = document.querySelector("#opening");
const bird = document.querySelector("#pigeon");
const start = document.querySelector("#startButton");
const restart = document.querySelector("#restartButton");

let jumping = 0;
let counter = 0;

function myRunningFunction(ele) {
  document.getElementById(ele).style.animationPlayState = "running";
}
function myPauseFunction(ele) {
  document.getElementById(ele).style.animationPlayState = "paused";
}

opening.addEventListener("animationiteration", () => {
  counter++;
});

function startGame() {
  document.querySelector("#startButton").classList.add("hide");
  myRunningFunction("building-crane");
  myRunningFunction("opening");
  document.querySelector("#bird").classList.remove("hide");
}
function jump() {
  jumping = 1;
  let jumpCount = 0;
  let jumpInterval = setInterval(function () {
    const characterTop = parseInt(
      window.getComputedStyle(bird).getPropertyValue("top")
    );
    if (characterTop > 100 && jumpCount < 10) {
      bird.style.top = characterTop - 4.5 + "px";
    }
    if (jumpCount > 12) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}
window.addEventListener("keydown", (evt) => {
  console.log(evt.key);
  if (evt.code === "Space") {
    jump();
  }
});

// Start Button
start.addEventListener("click", (evt) => {
  console.log("Button clicked");
  startGame();
  document.querySelector("h3").classList.add("hide");
  setInterval(function () {
    let characterTop = parseInt(
      window.getComputedStyle(bird).getPropertyValue("top")
    );
    if (jumping == 0) {
      bird.style.top = characterTop + 2 + "px";
    }
    // let pipeLeft = parseInt(
    //   window.getComputedStyle(pipe).getPropertyValue("left")
    // );
    // let openingTop = parseInt(
    //   window.getComputedStyle(opening).getPropertyValue("top")
    // );
    // let cTop = -(500 - characterTop);
    if (characterTop > 533 || characterTop < 100) {
      // if (bird falls to bottom) or ()
      console.log("something");
      // alert("Game over. Score: "+(counter-1));

      bird.style.top = 250 + "px";
      // bird.style.left = 600  + "px";
      document.querySelector("#restartButton").classList.remove("hide");
      myPauseFunction("building-crane");
      myPauseFunction("opening");
      document.getElementById("bird").classList.add("hide");
      counter = 0;
      document.querySelector('h3').textContent = 'Retry?'
      document.querySelector('h3').classList.remove('hide');
    }
  }, 10);
});

// Restart Button
restart.addEventListener("click", (evt) => {
    console.log("Button clicked"); 
    pipe.classList.add('hide');
    startGame();
    document.querySelector("h3").classList.add("hide");
    document.querySelector("#restartButton").classList.add("hide");
   
    setInterval(function(){pipe.classList.remove('hide')}, 1500);

});
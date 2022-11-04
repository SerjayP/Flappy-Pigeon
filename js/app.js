const game = document.querySelector("#game");
const pipe1 = document.querySelector("#pipe1");
const pipe2 = document.querySelector("#pipe2");
const opening = document.querySelector("#opening");
const bird = document.querySelector("#pigeon");
const start = document.querySelector("#startButton");
const restart = document.querySelector("#restartButton");
const building1 = document.querySelector("#building1");
const building2 = document.querySelector("#building2");
const building3 = document.querySelector("#building3");
let jumping = 0;
let counter = 0;

const allBuildings = [
  {
    number: 1,
    path: "images/Building1.png",
  },
  {
    number: 2,
    path: "images/Building2.png",
  },
  {
    number: 3,
    path: "images/Building3.png",
  },
  {
    number: 4,
    path: "images/Building4.png",
  },
  {
    number: 5,
    path: "images/Building5.png",
  },
  {
    number: 6,
    path: "images/Building6.png",
  },
  {
    number: 7,
    path: "images/Building7.png",
  },
  {
    number: 8,
    path: "images/Building8.png",
  },
  {
    number: 9,
    path: "images/Building9.png",
  },
  {
    number: 10,
    path: "images/Building10.png",
  },
  {
    number: 11,
    path: "images/Building11.png",
  },
];

// Randomize Building
function randomizeBuilding(ele, num) {
  let randomNum = Math.ceil(Math.random() * 11)
  allBuildings.forEach((location) => {
    if (randomNum === location.number) {
      console.log("Randomizing Building " + num)
      // console.log(Math.ceil(Math.random() * 11));
      ele.setAttribute("src", location.path);
    }
  });
} 

// Makes animation run
function myRunningFunction(ele) {
  document.getElementById(ele).style.animationPlayState = "running";
}
// make animation pause
function myPauseFunction(ele) {
  document.getElementById(ele).style.animationPlayState = "paused";
}
// counts how many times animation ran
randomizeBuilding(building1, 1);
randomizeBuilding(building2, 2);
pipe1.addEventListener("animationiteration", () => {
  randomizeBuilding(building1, 1);
  counter++;
  // console.log("Building1" + counter)
  setTimeout(function(){
   randomizeBuilding(building2, 2);
   counter++
  },4000)
  // console.log("building2" + counter)
});

function startGame() {
  document.querySelector("#startButton").classList.add("hide");
  myRunningFunction("pipe1");
  myRunningFunction("opening");
  document.querySelector("#bird").classList.remove("hide");
  setTimeout(function () {
    myRunningFunction("pipe2");
  }, 4000);
}
function jump() {
  jumping = 1;
  let jumpCount = 0;
  let jumpInterval = setInterval(function () {
    // Returns bird position
    const characterTop = parseInt(
      window.getComputedStyle(bird).getPropertyValue("top")
    );
    // Bottom or Top end game
    if (characterTop > 0 && jumpCount < 10) {
      bird.style.top = characterTop - 5 + "px";
    }
    // Up resistance
    if (jumpCount > 12) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
    // How many times it jumps within 10milliseconds
  }, 10);
}
// Lis tens for spacebar or arrowup to jump
window.addEventListener("keydown", (evt) => {
  if (evt.code === "Space" || evt.code === "ArrowUp") {
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
    if (characterTop > 533 || characterTop < 1) {
      // if (bird falls to bottom) or ()
      // console.log("something");
      // alert("Game over. Score: "+(counter-1));

      bird.style.top = 250 + "px";
      // bird.style.left = 600  + "px";
      document.querySelector("#restartButton").classList.remove("hide");
      myPauseFunction("pipe1");
      myPauseFunction("pipe2");
      myPauseFunction("opening");
      document.getElementById("bird").classList.add("hide");
      counter = 0;
      document.querySelector("h3").textContent = "Retry?";
      document.querySelector("h3").classList.remove("hide");
    }
  }, 10);
});

// Restart Button
restart.addEventListener("click", (evt) => {
  // console.log("Button clicked");
  // pipe.classList.add("hide");
  randomizeBuilding(building1, 1);
  randomizeBuilding(building2, 2);
  window.location.reload();
  // startGame();
  // document.querySelector("h3").classList.add("hide");
  // document.querySelector("#restartButton").classList.add("hide");
  // bird.style.top = 250 + "px";
  // setInterval(function () {
  // pipe.classList.remove("hide");
  // }, 1500);
});

// Things to talk to Teo about:
// 1. how to reset keyframes in JS DOM
// 2. Why is it taking random seconds to invoke randomize function

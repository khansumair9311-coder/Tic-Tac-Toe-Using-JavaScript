// console.log("Welcome to Tic Tac Toe");
// let music = new Audio("music.mp3");
// let audioturn = new Audio("ting.mp3");
// let gameover = new Audio("gameover.mp3");
// let turn = "X";
// let isgameover = false;
// const ChangeTurn = () => {
//   return turn === "X" ? "O" : "X";
// };
//function for a win
// const CheckWin = () => {
//   let boxtext = document.getElementsByClassName("boxtext");

//   const CheckWin = () => {
//     let boxtext = document.getElementsByClassName("boxtext");

//     let wins = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     wins.forEach((e) => {
//       if (
//         boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
//         boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
//         boxtext[e[0]].innerText !== ""
//       ) {
//         document.getElementById("info").innerText =
//           boxtext[e[0]].innerText + " Won!";
//         isgameover = true;
//       }
//     });
//   };
// };
//main game logic

// let boxes = document.getElementsByClassName("box");
// Array.from(boxes).forEach((element) => {
//   let boxtext = element.querySelector(".boxtext");
//   element.addEventListener("click", () => {
//     if (boxtext.innerText === "") {
//       boxtext.innerText = turn;
//       turn = ChangeTurn();
//       audioturn.play();
//       CheckWin();
//       if (!isgameover) {
//         document.getElementsByClassName("info")[0].innerText =
//           "Turn For " + turn;
//       }
//     }
//   });
// });
console.log("Welcome to Tic Tac Toe");

const music = new Audio("music.mp3");
const audioturn = new Audio("ting.mp3");
const gameover = new Audio("gameover.mp3");

let turn = "X";
let isgameover = false;

// Get HTML elements
const info = document.querySelector(".info");
const reset = document.getElementById("reset");
const boxes = document.querySelectorAll(".box");
const boxtexts = document.querySelectorAll(".boxtext");

// Safely play audio
const playAudio = (audio) => {
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.log("Audio playback unavailable:", error.message);
  });
};

// Change turn
const ChangeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// All winning combinations
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check for a win or draw
const CheckWin = () => {
  for (const combination of wins) {
    const [a, b, c] = combination;

    if (
      boxtexts[a].innerText !== "" &&
      boxtexts[a].innerText === boxtexts[b].innerText &&
      boxtexts[b].innerText === boxtexts[c].innerText
    ) {
      info.innerText = boxtexts[a].innerText + " Won!";
      isgameover = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      playAudio(gameover);

      return true;
    }
  }

  // Check for a draw
  const isDraw = [...boxtexts].every((box) => box.innerText !== "");

  if (isDraw) {
    info.innerText = "It's a Draw!";
    isgameover = true;

    playAudio(gameover);

    return true;
  }

  return false;
};

// Main game logic
boxes.forEach((element) => {
  const boxtext = element.querySelector(".boxtext");

  element.addEventListener("click", () => {
    // Prevent moves after the game ends
    if (isgameover || boxtext.innerText !== "") {
      return;
    }

    // Place X or O
    boxtext.innerText = turn;

    // Play turn sound
    playAudio(audioturn);

    // Check for a winner or draw
    if (!CheckWin()) {
      turn = ChangeTurn();
      info.innerText = "Turn For " + turn;
    }
  });
});

// Reset game
reset.addEventListener("click", () => {
  boxtexts.forEach((box) => {
    box.innerText = "";
  });

  turn = "X";
  isgameover = false;
  document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "0px";

  info.innerText = "Turn For X";
});
// Background music
music.loop = true;
music.volume = 0.5;

// Play music after the first user interaction
document.addEventListener(
  "click",
  () => {
    music.play().catch((error) => {
      console.log("Music playback failed:", error);
    });
  },
  { once: true },
);

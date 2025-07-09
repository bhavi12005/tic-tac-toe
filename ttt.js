let boxes = document.querySelectorAll(".game-box");
let restartBtn = document.querySelector("#restart-game");
let newGameBtn = document.querySelector("#new-game-btm"); 
let messageContainer = document.querySelector(".message-container");
let gameMessage = document.querySelector("#game-message");

let count = 0;
let turnO = true;

const winpattens = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [3, 4, 5],
   [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    gameMessage.innerText = "Game was a draw!";
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    gameMessage.innerText = `Congratulation, winner is ${winner}!`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winpattens) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);

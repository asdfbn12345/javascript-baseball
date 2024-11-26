const scoreBoard = require("./scoreBoard");
const userInput = require("./user-input");

const BASEBALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const NUMBER_BASEBALL_DIGITS = 3;

const MENU = {
  START_GAME: "1",
  EXIT_APPLICATION: "9"
}

async function start() {

  let isStopApplication = false;

  while (!isStopApplication) {
    const selectionResult = await userInput.selectMenu();

    switch (selectionResult) {
      case MENU.START_GAME:
        await playGame();
        break;
      case MENU.EXIT_APPLICATION:
        scoreBoard.showApplicationEnd();
        isStopApplication = true;
        break;
      default:
        break;
    }
  }
}



async function playGame() {
  const computerNumbers = getRandomNumbers(NUMBER_BASEBALL_DIGITS);
  scoreBoard.showGameSetting(computerNumbers);

  let isPlayNextInning = true;

  while (isPlayNextInning) {
    isPlayNextInning = await playInning(computerNumbers);
  }

  scoreBoard.showGameEnd();
}

function getRandomNumbers(digits) {
  const randomNumbers = shuffle([...BASEBALL_NUMBERS]);
  
  return randomNumbers.slice(0, digits);
}

async function playInning(computerNumbers) {
  const userNumbers = await userInput.guessNumbers(NUMBER_BASEBALL_DIGITS);

  const inningResult = checkBallCount(userNumbers, computerNumbers);
  
  const isPlayNextInning = inningResult.strikeCount !== NUMBER_BASEBALL_DIGITS;
  
  scoreBoard.showBallCount(inningResult);

  return isPlayNextInning;
}

function checkBallCount(userNumbers, computerNumbers) {
  let strikeCount = checkStrike(userNumbers, computerNumbers);
  let ballCount = checkBall(userNumbers, computerNumbers);
  let out = isOut(strikeCount, ballCount);

  return { strikeCount, ballCount, out };
}

function checkStrike(userNumbers, computerNumbers) {
  let strikeCount = 0;
  userNumbers.filter((userNumber, userIndex) => {
    computerNumbers.filter((computerNumber, computerIndex) => {
      if (userNumber === computerNumber && userIndex === computerIndex) {
        ++strikeCount;
      }
    })  
  })
  
  return strikeCount;
}

function checkBall(userNumbers, computerNumbers) {
  let ballCount = 0;
  userNumbers.filter((userNumber, userIndex) => {
    computerNumbers.filter((computerNumber, computerIndex) => {
      if (userNumber === computerNumber && userIndex !== computerIndex) {
        ++ballCount;
      }
    })  
  })
  return ballCount;
}

function isOut(strikeCount, ballCount) {
  return strikeCount === 0 && ballCount ===0
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}


exports.start = start;

import * as scoreBoard from "./scoreBoard";
import * as userInput from "./user-input";
import { InningResult } from "./types/types";

const BASEBALL_NUMBERS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const NUMBER_BASEBALL_DIGITS: number = 3;

const MENU = {
  START_GAME: "1",
  EXIT_APPLICATION: "9",
};

export async function start(): Promise<void> {
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

  const inningsToWin: number = await userInput.setInningsToWin();
  let currentInning = 0;

  let isUserWin = false;

  while (!isUserWin) {
    isUserWin = await playInning(computerNumbers);
    ++currentInning;
    if (currentInning === inningsToWin) {
      isUserWin = false;
    }
  }

  scoreBoard.showGameEnd(isUserWin);
  scoreBoard.showRecordEnd();
}

function getRandomNumbers(digits: number) {
  const randomNumbers = shuffle([...BASEBALL_NUMBERS]);

  return randomNumbers.slice(0, digits);
}

async function playInning(computerNumbers: number[]) {
  const userNumbers = await userInput.guessNumbers(NUMBER_BASEBALL_DIGITS);

  const inningResult = checkBallCount(userNumbers, computerNumbers);

  const isUserWin = inningResult.strikeCount === NUMBER_BASEBALL_DIGITS;

  scoreBoard.showBallCount(inningResult);

  return isUserWin;
}

function checkBallCount(
  userNumbers: number[],
  computerNumbers: number[]
): InningResult {
  const strikeCount = checkStrike(userNumbers, computerNumbers);
  const ballCount = checkBall(userNumbers, computerNumbers);
  const out = isOut(strikeCount, ballCount);

  return { strikeCount, ballCount, out };
}

function checkStrike(userNumbers: number[], computerNumbers: number[]) {
  let strikeCount = 0;
  userNumbers.filter((userNumber, userIndex) => {
    computerNumbers.filter((computerNumber, computerIndex) => {
      if (userNumber === computerNumber && userIndex === computerIndex) {
        ++strikeCount;
      }
    });
  });

  return strikeCount;
}

function checkBall(userNumbers: number[], computerNumbers: number[]) {
  let ballCount = 0;
  userNumbers.filter((userNumber, userIndex) => {
    computerNumbers.filter((computerNumber, computerIndex) => {
      if (userNumber === computerNumber && userIndex !== computerIndex) {
        ++ballCount;
      }
    });
  });
  return ballCount;
}

function isOut(strikeCount: number, ballCount: number) {
  return strikeCount === 0 && ballCount === 0;
}

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

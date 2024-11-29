import * as scoreBoard from "./scoreBoard";
import * as userInput from "./user-input";
import { InningResult } from "./types/types";
import * as constants from "./types/constants";
import * as gameRecorder from "./gameRecorder";
// import * as gameStatistics from "./gameStatistics";

export async function start(): Promise<void> {
  let isStopApplication = false;

  while (!isStopApplication) {
    const selectionResult = await userInput.selectMenu();

    switch (selectionResult) {
      case constants.MENU.START_GAME:
        await playGame();
        break;
      case constants.MENU.GAME_HISTORY:
        gameRecorder.showHistory();
        break;
      case constants.MENU.GAME_STATISTICS:
        break;
      case constants.MENU.EXIT_APPLICATION:
        scoreBoard.showApplicationEnd();
        isStopApplication = true;
        break;
      default:
        break;
    }
  }
}

async function playGame(): Promise<void> {
  const computerNumbers = getRandomNumbers(constants.NUMBER_BASEBALL_DIGITS);
  const inningsToWin: number = await userInput.setInningsToWin();

  scoreBoard.showGameSetting(computerNumbers);
  gameRecorder.startRecord(inningsToWin);
  let isUserWin = false;
  let lastInning: number = inningsToWin;

  for (let currentInning = 1; currentInning <= inningsToWin; ++currentInning) {
    isUserWin = await playInning(computerNumbers);
    if (isUserWin) {
      lastInning = currentInning;
      break;
    }
  }

  scoreBoard.showGameEnd(isUserWin);
  scoreBoard.showRecordEnd();

  gameRecorder.endRecord(isUserWin, lastInning);
}

function getRandomNumbers(digits: number): number[] {
  const randomNumbers = shuffle([...constants.BASEBALL_NUMBERS]);

  return randomNumbers.slice(0, digits);
}

async function playInning(computerNumbers: number[]): Promise<boolean> {
  const userNumbers = await userInput.guessNumbers(
    constants.NUMBER_BASEBALL_DIGITS
  );

  const inningResult = checkBallCount(userNumbers, computerNumbers);

  const isUserWin =
    inningResult.strikeCount === constants.NUMBER_BASEBALL_DIGITS;

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

function checkStrike(userNumbers: number[], computerNumbers: number[]): number {
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

function checkBall(userNumbers: number[], computerNumbers: number[]): number {
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

function isOut(strikeCount: number, ballCount: number): boolean {
  return strikeCount === 0 && ballCount === 0;
}

function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

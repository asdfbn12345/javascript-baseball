import * as scoreBoard from "./scoreBoard";
import * as userInput from "./user-input";
import { Menu } from "./types/enums";
import { InningResult } from "./types/interfaces";
import { BASEBALL_NUMBERS, NUMBER_BASEBALL_DIGITS } from "./types/constants";
import * as gameRecorder from "./gameRecorder";
import * as gameStatistics from "./gameStatistics";

export async function start(): Promise<void> {
  let isStopApplication = false;

  while (!isStopApplication) {
    const selectionResult: Menu = await userInput.selectMenu();

    switch (selectionResult) {
      case Menu.StartGame:
        await playGame();
        break;
      case Menu.GameHistory:
        gameRecorder.showHistory();
        break;
      case Menu.GameStatistics:
        gameStatistics.showStatistics();
        break;
      case Menu.ExitApplication:
        scoreBoard.showApplicationEnd();
        isStopApplication = true;
        break;
      default:
        break;
    }
  }
}

async function playGame(): Promise<void> {
  const computerNumbers = getRandomNumbers(NUMBER_BASEBALL_DIGITS);
  const inningsToWin: number = await userInput.setInningsToWin();

  scoreBoard.showGameSetting(computerNumbers);
  const recordStartTime = gameRecorder.startRecord();
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

  gameRecorder.endRecord(isUserWin, recordStartTime, inningsToWin, lastInning);
  scoreBoard.showRecordEnd();
}

function getRandomNumbers(digits: number): number[] {
  const randomNumbers = shuffle([...BASEBALL_NUMBERS]);

  return randomNumbers.slice(0, digits);
}

async function playInning(computerNumbers: number[]): Promise<boolean> {
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

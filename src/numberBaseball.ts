import * as scoreBoard from "./scoreBoard";
import * as userInput from "./user-input";
import { SINGLE_DIGITS, MAX_DIGITS, Menu } from "./types/constants";
import { InningResult } from "./types/interfaces";
import { BaseballNumbers, SingleDigit, ScoreCount, MenuType } from "./types/types";
import { GameRecorder } from "./gameRecorder";
import { GameStatistics } from "./gameStatistics";

export class NumberBaseballGame {
  private gameRecorder: GameRecorder;
  private gameStats: GameStatistics;

  constructor(
    gameRecorder: GameRecorder = GameRecorder.getInstance(),
    gameStats: GameStatistics = GameStatistics.getInstance()
  ) {
    this.gameRecorder = gameRecorder;
    this.gameStats = gameStats;
  }

  public async start(): Promise<void> {
    let isRunning = true;

    while (isRunning) {
      const selectionResult: MenuType = await userInput.selectMenu();

      switch (selectionResult) {
        case Menu.StartGame:
          await this.playGame();
          break;
        case Menu.GameHistory:
          this.gameRecorder.showHistory();
          break;
        case Menu.GameStatistics:
          this.gameStats.showStatistics();
          break;
        case Menu.ExitApplication:
          scoreBoard.showApplicationEnd();
          isRunning = false;
          break;
        default:
          break;
      }
    }
  }

  private async playGame(): Promise<void> {
    const inningsToWin: number = await userInput.setInningsToWin();
    this.gameRecorder.startNewRecord(inningsToWin);

    const computerNumbers = this.getRandomNumbers(MAX_DIGITS);
    scoreBoard.showGameSetting(computerNumbers);
    
    let isUserWin = false;
    let lastInning: number = inningsToWin;

    for (let currentInning = 1; currentInning <= inningsToWin; ++currentInning) {
      isUserWin = await this.playInning(computerNumbers);
      if (isUserWin) {
        lastInning = currentInning;
        break;
      }
    }

    scoreBoard.showGameEnd(isUserWin);

    this.gameRecorder.endRecord(isUserWin, lastInning);
    scoreBoard.showRecordEnd();
  }

  private getRandomNumbers(digits: number): BaseballNumbers {
    const randomNumbers = shuffle([...SINGLE_DIGITS]);
    return randomNumbers.slice(0, digits) as BaseballNumbers;
  }

  private async playInning(computerNumbers: BaseballNumbers): Promise<boolean> {
    const userNumbers = await userInput.guessNumbers(MAX_DIGITS);
    const inningResult = this.checkBallCount(userNumbers, computerNumbers);
    const isUserWin = inningResult.strikeCount === MAX_DIGITS;

    scoreBoard.showBallCount(inningResult);

    return isUserWin;
  }

  private checkBallCount(
    userNumbers: BaseballNumbers,
    computerNumbers: BaseballNumbers
  ): InningResult {
    const strikeCount = this.getStrikeCount(userNumbers, computerNumbers) as ScoreCount;
    const ballCount = this.getBallCount(userNumbers, computerNumbers) as ScoreCount;
    const out = this.isOut(strikeCount, ballCount);

    return { strikeCount, ballCount, out };
  }

  private getStrikeCount(userNumbers: BaseballNumbers, computerNumbers: BaseballNumbers): ScoreCount {
    return userNumbers.filter((num: SingleDigit, index: number) => num === computerNumbers[index]).length as ScoreCount;
  }

  private getBallCount(userNumbers: BaseballNumbers, computerNumbers: BaseballNumbers): ScoreCount {
    return userNumbers.filter((num: SingleDigit, index: number) => computerNumbers.includes(num) && computerNumbers[index] !== num).length as ScoreCount;
  }

  private isOut(strikeCount: ScoreCount, ballCount: ScoreCount): boolean {
    return strikeCount === 0 && ballCount === 0;
  }


}


function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
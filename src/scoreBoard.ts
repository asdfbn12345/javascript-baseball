import { UserType } from "./types/enums";
import { InningResult } from "./types/types";

export function showGameSetting(computerNumbers: number[]): void {
  console.log("컴퓨터가 숫자를 뽑았습니다.");
  console.log(computerNumbers);
}

export function showBallCount(inningResult: InningResult): void {
  let scoreBoardString = "";

  if (inningResult.out) {
    scoreBoardString = "낫싱";
  } else {
    if (inningResult.ballCount != 0) {
      scoreBoardString = `${inningResult.ballCount}볼 `;
    }
    if (inningResult.strikeCount != 0) {
      scoreBoardString += `${inningResult.strikeCount}스트라이크`;
    }
  }
  console.log(scoreBoardString);
}

export function showGameEnd(isUserWin: boolean): void {
  let winner;

  if (isUserWin) {
    console.log("3개의 숫자를 모두 맞히셨습니다.");
    winner = UserType.User;
  } else {
    winner = UserType.Computer;
  } 
  console.log(`${winner}가 승리하였습니다.`);  
  console.log("-------게임 종료-------");
}

export function showRecordEnd(): void {
  console.log("-------기록 종료-------");
}

export function showApplicationEnd(): void {
  console.log("애플리케이션이 종료되었습니다.");
}

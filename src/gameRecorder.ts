import { GameRecord } from "./types/types";
import { UserType } from "./types/enums"

export const gameRecords: GameRecord[] = [];

export function showHistory(): void {
  console.log("===================History===================");
  gameRecords.forEach((gameRecord) => {
    console.log(
      `[${gameRecord.id}] / ` +
        `시작시간: ${gameRecord.startTime} / ` +
        `종료시간: ${gameRecord.endTime} / ` +
        `횟수: ${gameRecord.lastInning} / ` +
        `승리자: ${gameRecord.winner}`
    );
  });
  console.log("=============================================");
}

/** Returns Date.now() */
export function startRecord(): number {
  return Date.now();
}

export function endRecord(isUserWin: boolean, startTime: number, inningsToWin: number, lastInning: number): void {
  const gameRecord: GameRecord = {
    id: gameRecords.length + 1,
    startTime: getFormattedTime(startTime),
    endTime: getFormattedTime(Date.now()),
    inningsToWin: inningsToWin,
    lastInning: lastInning,
    winner: isUserWin ? UserType.User : UserType.Computer,
  };
  gameRecords.push(gameRecord);
}

function getFormattedTime(date: number): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  let formattedDate = date.toLocaleString("ko-KR", options);
  const dateDotIndex = formattedDate.lastIndexOf(".");
  formattedDate =
    formattedDate.slice(0, dateDotIndex) +
    formattedDate.slice(dateDotIndex + 1);

  return formattedDate;
}

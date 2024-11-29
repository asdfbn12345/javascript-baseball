import { GameRecord } from "./types/types";

const gameRecords: GameRecord[] = [];
// TODO: 아무런 의미도 없다고 전달하고싶음
const gameRecord: GameRecord = {
  id: 0,
  startTime: "",
  endTime: "",
  inningsToWin: 1,
  lastInning: 1,
  winner: "사용자",
};

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

// TODO: 타입의 모든 속성값을 채우도록 강제할 방법이 필요할 것 같다.
// 현재는 작성자가 types.ts와 endRecord() 함수를 비교해야 모든 값이 할당되는지 확인할 수 있음.
export function startRecord(inningsToWin: number): void {
  gameRecord.id = gameRecords.length + 1;
  gameRecord.startTime = getFormattedTime();
  gameRecord.inningsToWin = inningsToWin;
}

export function endRecord(isUserWin: boolean, lastInning: number): void {
  gameRecord.endTime = getFormattedTime();
  gameRecord.lastInning = lastInning;
  gameRecord.winner = isUserWin ? "사용자" : "컴퓨터";
  gameRecords.push({ ...gameRecord });
}

function getFormattedTime(): string {
  const date = new Date();
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

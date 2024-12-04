import { GameRecord } from "./types/interfaces";
import { UserType } from "./types/enums";
import { MESSAGES_BAR, RECORDER_MESSAGES } from "./types/constants";

export class GameRecorder {
  private static instance: GameRecorder;
  private gameRecords: GameRecord[] = [];
  private currentGameRecord: GameRecord | null = null;

  private constructor() {}

  public static getInstance(): GameRecorder {
    if (!GameRecorder.instance) {
      GameRecorder.instance = new GameRecorder();
    }
    return GameRecorder.instance;
  }

  public getGameRecords(): readonly Readonly<GameRecord>[] {
    if (this.gameRecords.length === 0) {
      return [];
    }
    return this.gameRecords as readonly Readonly<GameRecord>[];
  }

  public getGameRecordsLength(): number {
    return this.gameRecords.length;
  }

  public getCurrentGameRecord(): Readonly<GameRecord> | null {
    return this.currentGameRecord;
  }

  public showHistory(): void {
    console.log(MESSAGES_BAR.HISTORY_BAR);
    this.gameRecords.forEach((gameRecord) => {
      console.log(
        `[${gameRecord.id}] / ` +
          `시작시간: ${convertTime(gameRecord.startTime)} / ` +
          `종료시간: ${convertTime(gameRecord.endTime)} / ` +
          `횟수: ${gameRecord.lastInning} / ` +
          `승리자: ${gameRecord.winner}`
      );
    });
    console.log(MESSAGES_BAR.BAR);
  }

  public startNewRecord(inningsToWin: number): void {
    this.currentGameRecord = {
      id: this.gameRecords.length + 1,
      startTime: new Date(),
      endTime: null,
      inningsToWin: inningsToWin,
      lastInning: 0,
      winner: null,
    };
  }

  public endRecord(isUserWin: boolean, lastInning: number): void {
    if (!this.currentGameRecord) {
      throw new Error(RECORDER_MESSAGES.NOT_STARTED_ERROR);
    }
    if (lastInning < 1 || lastInning > this.currentGameRecord.inningsToWin) {
      throw new Error(RECORDER_MESSAGES.INVALID_INNINGS_ERROR);
    }

    const updatedRecord: GameRecord = {
      ...this.currentGameRecord,
      endTime: new Date(),
      lastInning: lastInning,
      winner: isUserWin ? UserType.User : UserType.Computer
    };

    this.gameRecords.push(updatedRecord);
    this.currentGameRecord = null;
  }
}

function convertTime(time: Date | null): string {
  if (!time) return "";
  const minutes = ('0' + time.getMinutes()).slice(-2);
  const month = ('0' + (time.getMonth() + 1)).slice(-2);
  const date = ('0' + time.getDate()).slice(-2);
  const hours = ('0' + time.getHours()).slice(-2);
  return `${time.getFullYear()}. ${month}. ${date} ${hours}:${minutes}`;
}
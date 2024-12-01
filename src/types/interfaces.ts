import { UserType } from "./enums";

export interface InningResult {
  strikeCount: number;
  ballCount: number;
  out: boolean;
}

export interface GameRecord {
  readonly id: number;
  readonly startTime: string;
  readonly endTime: string;
  readonly inningsToWin: number;
  readonly lastInning: number;
  readonly winner: UserType;
}

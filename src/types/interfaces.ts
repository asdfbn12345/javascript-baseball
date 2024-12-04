import { UserType } from "./enums";
import { ScoreCount } from "./types";

export interface InningResult {
  readonly strikeCount: ScoreCount;
  readonly ballCount: ScoreCount;
  readonly out: boolean;
}

export interface GameRecord {
  readonly id: number;
  readonly startTime: Date;
  readonly endTime: Date | null;
  readonly inningsToWin: number;
  readonly lastInning: number;
  readonly winner: UserType | null;
}

type NumberPropertyNames<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

export type NumberProperties = NumberPropertyNames<GameRecord>;
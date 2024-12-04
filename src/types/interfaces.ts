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

export type ValidGameRecordId = number & { readonly brand: unique symbol };
export type ValidInningsToWin = number & { readonly brand: unique symbol };

export function createValidGameRecordId(id: number): ValidGameRecordId {
  if (id < 1) throw new Error('Game record ID must be positive');
  return id as ValidGameRecordId;
}

export function createValidInningsToWin(innings: number): ValidInningsToWin {
  if (innings < 1) throw new Error('Innings to win must be positive');
  return innings as ValidInningsToWin;
}
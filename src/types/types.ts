import { UserType } from "./enums";

export type InningResult = {
  strikeCount: number;
  ballCount: number;
  out: boolean;
};

export type GameRecord = {
  id: number;
  startTime: string;
  endTime: string;
  inningsToWin: number;
  lastInning: number;
  winner: UserType;
};

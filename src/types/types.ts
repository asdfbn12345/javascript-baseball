import { Menu, SINGLE_DIGITS, MAX_DIGITS } from "./constants";

export type SingleDigit = typeof SINGLE_DIGITS[number];

export type ScoreCount = 0 | 1 | 2 | 3;

type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

export type BaseballNumbers = Tuple<SingleDigit, typeof MAX_DIGITS>;

export type MenuType = typeof Menu[keyof typeof Menu];


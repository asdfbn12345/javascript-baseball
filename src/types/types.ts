import { Menu, SINGLE_DIGITS, MAX_DIGITS } from "./constants";

export type SingleDigit = typeof SINGLE_DIGITS[number];

type NumberRange<N extends number, Acc extends number[] = []> = 
  Acc['length'] extends N 
    ? [...Acc, Acc['length']][number]
    : NumberRange<N, [...Acc, Acc['length']]>;

export type ScoreCount = NumberRange<typeof MAX_DIGITS>;

type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

export type BaseballNumbers = Tuple<SingleDigit, typeof MAX_DIGITS>;

export type MenuType = typeof Menu[keyof typeof Menu];


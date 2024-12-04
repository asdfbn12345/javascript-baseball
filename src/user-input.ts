import * as readline from "readline";
import { stdin as input, stdout as output } from "process";
import { BaseballNumbers, MenuType } from "./types/types";
import { MENU, USER_INPUT_MESSAGES } from "./types/constants";
const rl = readline.createInterface({
  input,
  output,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer: string) => {
      resolve(answer);
    });
  });
}

function isValidMenu(value: string): value is MenuType {
  return Object.values(MENU).includes(value as MenuType);
}

export async function selectMenu(): Promise<MenuType> {
  let menu: MenuType;

  while (true) {
    const input = await askQuestion(USER_INPUT_MESSAGES.ASK_MENU);

    if (isValidMenu(input)) {
      menu = input;
      break;        
    }
      
    console.log(USER_INPUT_MESSAGES.INVALID_MENU);      
  }

  return menu;
}

export async function guessNumbers(length: number): Promise<BaseballNumbers> {
  while (true) {
    const input = await askQuestion(USER_INPUT_MESSAGES.INPUT_NUMBER(length));

    if (!isNumeric(input)) {
      console.log(USER_INPUT_MESSAGES.INVALID_NUMBER);
      continue;
    }
    if (!isCorrectLength(input, length)) {
      console.log(USER_INPUT_MESSAGES.INVALID_LENGTH);
      continue;
    }
    if (!hasNoDuplicates(input, length)) {
      console.log(USER_INPUT_MESSAGES.INVALID_DUPLICATE);
      continue;
    }
    
    const numbers = input.split("").map(Number);
    return numbers as BaseballNumbers;
  }
}

export async function setInningsToWin(): Promise<number> {
  let targetInnings: number | null = null;

  while (targetInnings === null) {
    const input: string = await askQuestion(USER_INPUT_MESSAGES.ASK_INNINGS_TO_WIN);

    const parsedNumber = Number(input);
    if (!isOneOrOver(parsedNumber)) continue;

    targetInnings = parsedNumber;
  }
  console.log(USER_INPUT_MESSAGES.SET_INNINGS_TO_WIN(targetInnings));

  return targetInnings;
}

function isCorrectLength(input: string, length: number): boolean {
  return input.length === length;
}

function hasNoDuplicates(input: string, length: number): boolean {
  return new Set(input).size === length;
}

function isNumeric(numbers: string): boolean {
  return /^\d+$/.test(numbers);
}

function isOneOrOver(number: number): boolean {
  return number >= 1;
}

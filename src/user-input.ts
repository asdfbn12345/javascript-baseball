import * as readline from "readline";
import { stdin as input, stdout as output } from "process";
import { BaseballNumbers, MenuType } from "./types/types";
import { Menu } from "./types/constants";
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

export async function selectMenu(): Promise<MenuType> {
  let menu: MenuType;

  while (true) {
    const input = await askQuestion(
      `게임을 새로 시작하려면 ${Menu.StartGame}, ` +
      `기록을 보려면 ${Menu.GameHistory}, ` +
      `통계를 보려면 ${Menu.GameStatistics}, ` +
      `종료하려면 ${Menu.ExitApplication}를 입력하세요. `
    );

    if (Object.values(Menu).includes(input as MenuType)) {
      menu = input as MenuType;
      break;        
    }
    
    console.log(`올바른 메뉴를 입력하세요.`);      
  }

  return menu;
}

export async function guessNumbers(length: number): Promise<BaseballNumbers> {
  while (true) {
    const input = await askQuestion("숫자를 입력하세요: ");

    if (!isNumeric(input)) {
      console.log("모든 글자는 숫자로만 이루어져야 합니다.");
      continue;
    }
    if (!isCorrectLength(input, length)) {
      console.log(`입력값은 ${length}자리 숫자여야 합니다.`);
      continue;
    }
    if (!hasNoDuplicates(input, length)) {
      console.log("입력값은 중복되지 않아야 합니다.");
      continue;
    }
    
    const numbers = input.split("").map(Number);
    return numbers as BaseballNumbers;
  }
}

export async function setInningsToWin(): Promise<number> {
  let targetInnings: number | null = null;

  while (targetInnings === null) {
    const input: string = await askQuestion(
      "컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요? "
    );

    const parsedNumber = Number(input);
    if (!isOneOrOver(parsedNumber)) continue;

    targetInnings = parsedNumber;
  }
  console.log(`이닝수는 ${targetInnings}회로 지정되었습니다.`);

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

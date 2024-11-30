import * as readline from "readline";
import { stdin as input, stdout as output } from "process";
import { MENU } from "./types/constants";

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

export async function selectMenu(): Promise<string> {
  const isValidMenu = (input: string): boolean =>
    Object.values(MENU).includes(input);
  let menu;

  while (!menu) {
    try {
      const input = await askQuestion(
        `게임을 새로 시작하려면 ${MENU.START_GAME}, ` +
          `기록을 보려면 ${MENU.GAME_HISTORY}, ` +
          `통계를 보려면 ${MENU.GAME_STATISTICS}, ` +
          `종료하려면 ${MENU.EXIT_APPLICATION}를 입력하세요. `
      );

      if (!isValidMenu(input)) {
        console.log(`올바른 메뉴를 입력하세요.`);
        continue;
      }
      menu = input;
    } catch (error) {
      console.log("입력을 처리하는 중 문제가 발생했습니다.", error);
    }
  }

  return menu;
}

export async function guessNumbers(length: number): Promise<number[]> {
  const regex = new RegExp(`^\\d{${length}}$`);
  let numbers: number[] | null = null;

  while (!numbers) {
    try {
      const input = await askQuestion("숫자를 입력하세요. ");

      if (!regex.test(input)) {
        console.log(`입력값은 ${length}자리 숫자여야 합니다.`);
        continue;
      }

      const isDuplicated = (new Set(input)).size !== length;
      if (isDuplicated) {
        console.log(`입력값은 중복되지 않아야 합니다.`);
        continue;
      }

      numbers = input.split("").map(Number);
      break;
    } catch (error) {
      console.log("입력을 처리하는 중 문제가 발생했습니다.", error);
    }
  }

  return numbers;
}

export async function setInningsToWin(): Promise<number> {
  let number;

  while (!number) {
    try {
      const input: string = await askQuestion(
        "컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요? "
      );

      const parsedNumber = Number(input);
      if (isNaN(parsedNumber) || parsedNumber < 1) {
        console.log(`입력값은 1이상의 숫자여야 합니다.`);
        continue;
      }

      number = Number(input);
    } catch (error) {
      console.log("입력을 처리하는 중 문제가 발생했습니다.", error);
    }
  }
  console.log(`승리 횟수는 ${number}회로 지정되었습니다.`);

  return number;
}

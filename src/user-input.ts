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
  const regex = new RegExp(`^[${Object.values(MENU)}]$`);
  let menu;

  while (!menu) {
    try {
      const input = await askQuestion(
        "게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요. "
      );

      if (!regex.test(input)) {        
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
      
      numbers = input.split("").map(Number);
      break;
    } catch (error) {
      console.log("입력을 처리하는 중 문제가 발생했습니다.", error);
    }
  }

  return numbers;
}

export async function setInningsToWin(): Promise<number> {
  const regex = new RegExp(`^\\d+$`);
  let number;

  while (!number) {
    try {
      const input: string = await askQuestion("컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요? ");

      if (!regex.test(input)) {
        console.log(`입력값은 숫자여야 합니다.`);
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
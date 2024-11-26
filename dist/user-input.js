var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
const rl = readline.createInterface({
    input,
    output,
});
function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}
export function selectMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const regex = new RegExp(`^\\d$`);
        let input;
        while (!input) {
            try {
                input = yield askQuestion("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요. ");
                if (!regex.test(input)) {
                    console.log(`입력값은 한자리 숫자여야 합니다.`);
                    continue;
                }
            }
            catch (error) {
                console.log("입력을 처리하는 중 문제가 발생했습니다.", error);
            }
        }
        return input;
    });
}
export function guessNumbers(length) {
    return __awaiter(this, void 0, void 0, function* () {
        const regex = new RegExp(`^\\d{${length}}$`);
        let numbers;
        while (!numbers) {
            try {
                const input = yield askQuestion("숫자를 입력하세요. ");
                if (!regex.test(input)) {
                    console.log(`입력값은 ${length}자리 숫자여야 합니다.`);
                    continue;
                }
                numbers = input.split("").map(Number);
            }
            catch (error) {
                console.log("입력을 처리하는 중 문제가 발생했습니다.", error);
            }
        }
        return numbers;
    });
}

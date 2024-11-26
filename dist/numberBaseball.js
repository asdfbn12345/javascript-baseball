var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as scoreBoard from "./scoreBoard";
import * as userInput from "./user-input";
const BASEBALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const NUMBER_BASEBALL_DIGITS = 3;
const MENU = {
    START_GAME: "1",
    EXIT_APPLICATION: "9",
};
export function start() {
    return __awaiter(this, void 0, void 0, function* () {
        let isStopApplication = false;
        while (!isStopApplication) {
            const selectionResult = yield userInput.selectMenu();
            switch (selectionResult) {
                case MENU.START_GAME:
                    yield playGame();
                    break;
                case MENU.EXIT_APPLICATION:
                    scoreBoard.showApplicationEnd();
                    isStopApplication = true;
                    break;
                default:
                    break;
            }
        }
    });
}
function playGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const computerNumbers = getRandomNumbers(NUMBER_BASEBALL_DIGITS);
        scoreBoard.showGameSetting(computerNumbers);
        let isPlayNextInning = true;
        while (isPlayNextInning) {
            isPlayNextInning = yield playInning(computerNumbers);
        }
        scoreBoard.showGameEnd();
    });
}
function getRandomNumbers(digits) {
    const randomNumbers = shuffle([...BASEBALL_NUMBERS]);
    return randomNumbers.slice(0, digits);
}
function playInning(computerNumbers) {
    return __awaiter(this, void 0, void 0, function* () {
        const userNumbers = yield userInput.guessNumbers(NUMBER_BASEBALL_DIGITS);
        const inningResult = checkBallCount(userNumbers, computerNumbers);
        const isPlayNextInning = inningResult.strikeCount !== NUMBER_BASEBALL_DIGITS;
        scoreBoard.showBallCount(inningResult);
        return isPlayNextInning;
    });
}
function checkBallCount(userNumbers, computerNumbers) {
    const strikeCount = checkStrike(userNumbers, computerNumbers);
    const ballCount = checkBall(userNumbers, computerNumbers);
    const out = isOut(strikeCount, ballCount);
    return { strikeCount, ballCount, out };
}
function checkStrike(userNumbers, computerNumbers) {
    let strikeCount = 0;
    userNumbers.filter((userNumber, userIndex) => {
        computerNumbers.filter((computerNumber, computerIndex) => {
            if (userNumber === computerNumber && userIndex === computerIndex) {
                ++strikeCount;
            }
        });
    });
    return strikeCount;
}
function checkBall(userNumbers, computerNumbers) {
    let ballCount = 0;
    userNumbers.filter((userNumber, userIndex) => {
        computerNumbers.filter((computerNumber, computerIndex) => {
            if (userNumber === computerNumber && userIndex !== computerIndex) {
                ++ballCount;
            }
        });
    });
    return ballCount;
}
function isOut(strikeCount, ballCount) {
    return strikeCount === 0 && ballCount === 0;
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

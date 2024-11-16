const scoreBoard = require("./scoreBoard");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({
  input,
  output,
});

const NUMBER_BASEBALL_DIGITS = 3;
const HIGHEST_DIGIT = 9;
const LOWEST_DIGIT = 1;

async function start() {
  let userInput = "";
  let bStopGame = false;

  while (!bStopGame) {
    await askQuestion(
      "게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요. "
    ).then((input) => {
      userInput = input;
    });

    switch (userInput) {
      case "1":
        await playGame();
        break;
      case "9":
        scoreBoard.showApplicationEnd();
        bStopGame = true;
        break;
    }
  }
}

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

async function playGame() {
  const computerNumber = getRandomNumberArray(NUMBER_BASEBALL_DIGITS);
  scoreBoard.showGameSetting(computerNumber);

  let bNextInning = true;

  while (bNextInning) {
    bNextInning = await playInning(computerNumber);
  }

  scoreBoard.showGameEnd();
}

function getRandomNumberArray(digits) {
  const numberArray = [];

  while (numberArray.length != digits) {
    let currentNumber = Math.floor(
      Math.random() * HIGHEST_DIGIT + LOWEST_DIGIT
    );
    if (!numberArray.includes(currentNumber)) {
      numberArray.push(currentNumber);
    }
  }

  return numberArray;
}

// 야구 용어 참고 사이트: https://skinnonews.com/archives/28782
// 변수명 등을 조금 더 "야구스럽게" 바꿔보았습니다.
async function playInning(computerNumber) {
  let bGameFinished = true;

  await askQuestion("숫자를 입력하세요. ").then((answer) => {
    let inningResult = checkBallCount(answer.split(""), computerNumber);
    if (inningResult.strikeCount == NUMBER_BASEBALL_DIGITS) {
      bGameFinished = false;
    }

    scoreBoard.showBallCount(inningResult);
  });

  return bGameFinished;
}

// 야구 용어로, 스트라이크, 볼, 아웃을 통틀어 볼 카운트라고 부르더라구요.
// 그래서, 아웃인지도 볼 카운트 함수에서 다루면 좋을 것 같습니다.
function checkBallCount(userNumber, computerNumber) {
  let strikeCount = 0;
  let ballCount = 0;
  let out = false;

  userNumber.filter((userNumber, userDigit) => {
    computerNumber.filter((computerNumber, computerDigit) => {
      if (userNumber == computerNumber) {
        if (userDigit == computerDigit) {
          ++strikeCount;
        } else {
          ++ballCount;
        }
      }
    });
  });

  out = strikeCount == 0 && ballCount == 0;
  return { strikeCount, ballCount, out };
}

exports.start = start;

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({
  input,
  output,
});

const NUMBER_OF_DIGITS = 3;
const HIGHEST_DIGIT = 9;
const LOWEST_DIGIT = 1;

async function play() {
  let userInput = 1;
  while (userInput != 9) {
    await askQuestion(
      "게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요."
    ).then((input) => {
      userInput = input;
    });
    switch (userInput) {
      case "1":
        const computerNumber = getRandomNumberArray(NUMBER_OF_DIGITS);
        console.log("컴퓨터가 숫자를 뽑았습니다.");
        console.log(computerNumber);

        let result = false;

        while (!result) {
          result = await playRound(computerNumber);
        }
        console.log("3개의 숫자를 모두 맞히셨습니다.");
        console.log("-------게임 종료-------");
        break;
      case "9":
        console.log("애플리케이션이 종료되었습니다.");
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


function getRandomNumberArray(digit) {
  const numberArray = [];

  while (numberArray.length != digit) {
    let currentNumber = Math.floor(Math.random() * HIGHEST_DIGIT + LOWEST_DIGIT);
    if (!numberArray.includes(currentNumber)) {
      numberArray.push(currentNumber);
    }
  }

  return numberArray;
}

async function playRound(computerNumber) {
  let result = false;
  await askQuestion("숫자를 입력하세요.").then((answer) => {
    let matchResult = checkMatch(answer, computerNumber);
    if (matchResult.strikeCount == NUMBER_OF_DIGITS) {
      result = true;
    }

    let resultString = "";
    if (matchResult.ballCount != 0) {
      resultString = `${matchResult.ballCount}볼 `;
    }
    if (matchResult.strikeCount != 0) {
      resultString += `${matchResult.strikeCount}스트라이크`;
    }
    if (matchResult.ballCount == 0 && matchResult.strikeCount == 0) {
      resultString = "낫싱";
    }
    console.log(resultString);
  });

  return result;
}

function checkMatch(answer, computerNumber) {
  let strikeCount = 0;
  let ballCount = 0;

  answer.split("").filter((userNumber, userDigit) => {
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

  return { strikeCount, ballCount };
}

exports.play = play;
const readline = require("node:readline");
const {stdin:input, stdout:output} = require("node:process");
const { resolve } = require("node:path");
const { rejects } = require("node:assert");
const rl = readline.createInterface({
    input, output
});



// const rl = readline.createInterface({
//     input : process.stdin,
//     output : process.stdout,
// });

// let input = [];

// rl.on('line', (line) => {
//     rl.close();
// });


// let userInput = prompt("이름을 입력하세요");
// console.log(userInput);

// let gameEnd = false;

//playGame();


// while(!gameEnd) {
//     switch(userInput) {
//         case 1:
//             playGame();
//             break;
//         case 9:
//             exitGame();
//             break;
//         //default:
//     }
// }



//console.log(getRandomNumberArray().toString());

function getRandomNumberArray() {
    const numberArray = [];

    while (numberArray.length != 3){
        let currentNumber = Math.floor(Math.random() * 9 + 1);
        if (!numberArray.includes(currentNumber)) {
            numberArray.push(currentNumber);
        }
    }

    return numberArray;
}

// let a, b = checkMatch('123', [3, 1, 2]);
// console.log(a, b);

function checkMatch(answer, computerNumber){
    let strikeCount = 0;
    let ballCount = 0;

    answer.split("").filter((userNumber, userDigit) => {
        computerNumber.filter((computerNumber, computerDigit) => {
            if (userNumber == computerNumber) {
                if (userDigit == computerDigit) {
                    ++strikeCount;
                }else{
                    ++ballCount;
                }
            }    
        })        
    })

    return { strikeCount, ballCount };
}

// 입력을 기다리는 함수
function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer)
    });
  });
}

async function playRound(computerNumber) {
  let result = false;
  await askQuestion("숫자를 입력하세요.")
    .then((answer) => {

      let matchResult = checkMatch(answer, computerNumber);
      if (matchResult.strikeCount == 3) {
          result = true;
      }
  
      let resultString = "";
      if (matchResult.ballCount != 0) {
          resultString = `${matchResult.ballCount}볼 `;
      }
      if (matchResult.strikeCount != 0){
          resultString += `${matchResult.strikeCount}스트라이크`;
      }
      console.log(resultString);
    });

  return result;
}

async function playGame() {
  const computerNumber = getRandomNumberArray();
  console.log(computerNumber);

  let result = false;
  
  while(!result) {
    result = await playRound(computerNumber);
    console.log(result);
  }
  closeRound();
}



playGame()
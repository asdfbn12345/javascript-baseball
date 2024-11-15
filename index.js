// const readline = require("node:readline");
// const {stdin:input, stdout:output} = require("node:process");
// const rl = readline.createInterface({
//     input, output
// });

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

// function playGame() {
//     const computerNumber = getRandomNumberArray();
//     console.log(computerNumber);

//     let result = false;

//     while(!result){
//         result = playRound(computerNumber);
//     }
//     // closeRound();
    
// }

console.log(getRandomNumberArray().toString());

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

// let a, b = checkMatch('123', new Set([1, 2, 3]));
// console.log(a, b);

// function checkMatch(answer, computerNumber){
//     let strikeCount = 0;
//     let ballCount = 0;
//     let copySet = computerNumber;

//     for (let i = 0; i < 3; i++){
//         if (parseInt(answer[i]) == computerNumber[i]) {
//             strikeCount++;
//             copySet.delete(computerNumber[i]);
//         }
//     }
//     answer.split('').filter((char) => {
//         if (copySet.has(char)){
//             ballCount++;
//         }
//     })
//     return { strikeCount, ballCount };
// }


// function playRound(computerNumber) {
//     let result;
//     rl.question("숫자를 입력하세요.", (answer) => {
        
//     });
    
//     return true;
// }
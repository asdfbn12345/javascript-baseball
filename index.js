// const readline = require("readline");
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

playGame();


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

function playGame() {
    const computerNumber = getRandomNumber();
    console.log(computerNumber);

    // let result = false;

    // while(!result){
    //     result = playRound();
    // }
    // closeRound();
    
}

function getRandomNumber() {
    const numberSet = new Set();
    while (numberSet.size != 3){
        let currentNumber = Math.floor(Math.random() * 9 + 1);
        numberSet.add(currentNumber);
    }    
    console.log("numberSet: ", numberSet.toString());
    return numberSet;
}

function playRound() {
    let result;

    return true;
}
export function showGameSetting(computerNumbers) {
    console.log("컴퓨터가 숫자를 뽑았습니다.");
    console.log(computerNumbers);
}
export function showBallCount(inningResult) {
    let scoreBoardString = "";
    if (inningResult.out) {
        scoreBoardString = "낫싱";
    }
    else {
        if (inningResult.ballCount != 0) {
            scoreBoardString = `${inningResult.ballCount}볼 `;
        }
        if (inningResult.strikeCount != 0) {
            scoreBoardString += `${inningResult.strikeCount}스트라이크`;
        }
    }
    console.log(scoreBoardString);
}
export function showGameEnd() {
    console.log("3개의 숫자를 모두 맞히셨습니다.");
    console.log("-------게임 종료-------");
}
export function showApplicationEnd() {
    console.log("애플리케이션이 종료되었습니다.");
}

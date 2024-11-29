import { gameRecords } from "./gameRecorder";

export function showStatistics(): void {
  console.log("==================Statistics==================");
  if (gameRecords.length === 0) {
    console.log("통계를 출력할 데이터가 없습니다.");
  } else {
    showLeastInning();
    showMostInning();
    showMostInningsToWin();
    showMaxInningsToWin();
    showMinInningsToWin();
    showAverageInning();
    showComputerMostInningsToWin();
    showUserMostInningsToWin();
    showPepe();
  }
  console.log("==============================================");
}

function showLeastInning(): void {
  let leastInningId: number = 1;
  const leastInning = gameRecords.reduce((leastInning, gameRecord) => {
    const nextLeastInning = Math.min(leastInning, gameRecord.lastInning);
    if (leastInning !== nextLeastInning) {
      leastInningId = gameRecord.id;
    }
    return nextLeastInning;
  }, Infinity);

  console.log(`가장 적은 횟수: ${leastInning}회 - [${leastInningId}]`);
}

function showMostInning(): void {
  let mostInningId: number = 1;
  const mostInning = gameRecords.reduce((mostInning, gameRecord) => {
    const nextMostInning = Math.max(mostInning, gameRecord.lastInning);
    if (mostInning !== nextMostInning) {
      mostInningId = gameRecord.id;
    }
    return nextMostInning;
  }, -Infinity);

  console.log(`가장 많은 횟수: ${mostInning}회 - [${mostInningId}]`);
}

function showMostInningsToWin(): void {
  const frequencyMap: Map<number, number[]> = new Map();

  gameRecords.forEach((gameRecord) => {
    const a = frequencyMap.get(gameRecord.inningsToWin);
    if (a === undefined) {
      frequencyMap.set(gameRecord.inningsToWin, [gameRecord.id]);
    }
    a?.push(gameRecord.id);
  });

  let mostInningsToWin: number = 1;
  let mostFrequency: number = -Infinity;
  frequencyMap.forEach((ids, inningsToWin) => {
    mostFrequency = Math.max(mostFrequency, ids.length);
    if (mostFrequency === ids.length) {
      mostInningsToWin = inningsToWin;
    }
  });

  //TODO:
  const mostInningsToWinId: number = Number(
    frequencyMap.get(mostInningsToWin)?.slice(-1).toString()
  );

  console.log(
    `가장 많이 적용된 승리/패패 횟수: ${mostInningsToWin}회 - [${mostInningsToWinId}]`
  );
}

function showMaxInningsToWin(): void {
  let maxInningsToWinId: number = 1;

  const maxInningsToWin = gameRecords.reduce((maxInningsToWin, gameRecord) => {
    const nextMaxInningsToWin = Math.max(
      maxInningsToWin,
      gameRecord.inningsToWin
    );
    if (maxInningsToWin !== nextMaxInningsToWin) {
      maxInningsToWinId = gameRecord.id;
    }
    return nextMaxInningsToWin;
  }, -Infinity);

  console.log(
    `가장 큰 값으로 적용된 승리/패패 횟수: ${maxInningsToWin}회 - [${maxInningsToWinId}]`
  );
}

function showMinInningsToWin(): void {
  let minInningsToWinId: number = 1;

  const minInningsToWin = gameRecords.reduce((minInningsToWin, gameRecord) => {
    const nextMinInningsToWin = Math.min(
      minInningsToWin,
      gameRecord.inningsToWin
    );
    if (minInningsToWin !== nextMinInningsToWin) {
      minInningsToWinId = gameRecord.id;
    }
    return nextMinInningsToWin;
  }, Infinity);

  console.log(
    `가장 적은 값으로 적용된 승리/패패 횟수: ${minInningsToWin}회 - [${minInningsToWinId}]`
  );
}

function showAverageInning(): void {
  const sumOfInningsToWin = gameRecords.reduce((sum, gameRecord) => {
    return (sum += gameRecord.inningsToWin);
  }, 0);

  const averageInningsToWin = sumOfInningsToWin / gameRecords.length;

  console.log(`적용된 승리/패패 횟수 평균: ${averageInningsToWin}회`);
}

function showComputerMostInningsToWin(): void {
  // console.log(
  //   `컴퓨터가 가장 많이 승리한 승리/패패 횟수: ${computerMostInningsToWin}회`
  // );
}

function showUserMostInningsToWin(): void {
  // console.log(
  //   `사용자가 가장 많이 승리한 승리/패패 횟수: ${userMostInningsToWin}회`
  // );
}

function showPepe() {
  console.log(`⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⠉⠉⠉⠛⠻⣿⣿⠿⠛⠛⠙⠛⠻⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⢀⣀⣀⡀⠀⠈⢄⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠏⠀⠀⠀⠔⠉⠁⠀⠀⠈⠉⠓⢼⡤⠔⠒⠀⠐⠒⠢⠌⠿⢿⣿⣿⣿
⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⢀⠤⣒⠶⠤⠭⠭⢝⡢⣄⢤⣄⣒⡶⠶⣶⣢⡝⢿⣿
⡿⠋⠁⠀⠀⠀⠀⣀⠲⠮⢕⣽⠖⢩⠉⠙⣷⣶⣮⡍⢉⣴⠆⣭⢉⠑⣶⣮⣅⢻
⠀⠀⠀⠀⠀⠀⠀⠉⠒⠒⠻⣿⣄⠤⠘⢃⣿⣿⡿⠫⣿⣿⣄⠤⠘⢃⣿⣿⠿⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⠤⠭⣥⣀⣉⡩⡥⠴⠃⠀⠈⠉⠁⠈⠉⠁⣴⣾⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠔⠊⠀⠀⠀⠓⠲⡤⠤⠖⠐⢿⣿⣿⣿
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿
⠀⠀⠀⠀⠀⠀⠀⢸⣿⡻⢷⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣘⣿⣿
⠀⠀⠀⠀⠀⠠⡀⠀⠙⢿⣷⣽⣽⣛⣟⣻⠷⠶⢶⣦⣤⣤⣤⣤⣶⠾⠟⣯⣿⣿
⠀⠀⠀⠀⠀⠀⠉⠂⠀⠀⠀⠈⠉⠙⠛⠻⠿⠿⠿⠿⠶⠶⠶⠶⠾⣿⣟⣿⣿⣿
⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿
⣿⣿⣶⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣟⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`);
}

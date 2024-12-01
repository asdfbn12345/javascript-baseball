import { getGameRecords } from "./gameRecorder";
import { UserType } from "./types/enums";
import { GameRecord } from "./types/interfaces";

export function showStatistics(): void {
  console.log("==================Statistics==================");
  if (getGameRecords().length === 0) {
    console.log("통계를 출력할 데이터가 없습니다.");
  } else {
    try {
      showLeastInning();
      showMostInning();
      showMostInningsToWin();
      showMaxInningsToWin();
      showMinInningsToWin();
      showAverageInning();
      showComputerMostInningsToWin();
      showUserMostInningsToWin();
    } catch (error) {
      console.log("통계 생성 중 오류가 발생했습니다:", error);
    }
  }
  console.log("==============================================");
}

function showLeastInning(): void {
  const extremeValueObject = getExtremeAttribute("lastInning", false);
  const leastInning = extremeValueObject?.extremeValue;
  const leastInningId = extremeValueObject?.extremeValueId;

  console.log(`가장 적은 횟수: ${leastInning}회 - [${leastInningId}]`);
}

function showMostInning(): void {
  const extremeValueObject = getExtremeAttribute("lastInning", true);
  const mostInning = extremeValueObject?.extremeValue;
  const mostInningId = extremeValueObject?.extremeValueId;

  console.log(`가장 많은 횟수: ${mostInning}회 - [${mostInningId}]`);
}

function showMostInningsToWin(): void {
  const mostAttributeObject = getMostAttribute(
    "inningsToWin",
    Object.values(UserType)
  );
  const mostInningsToWin = mostAttributeObject?.mostValue;
  const mostInningsToWinId = mostAttributeObject?.mostValueId;

  console.log(
    `가장 많이 적용된 승리/패패 횟수: ${mostInningsToWin}회 - [${mostInningsToWinId}]`
  );
}

function showMaxInningsToWin(): void {
  const extremeValueObject = getExtremeAttribute("inningsToWin", true);
  const maxInningsToWin = extremeValueObject?.extremeValue;
  const maxInningsToWinId = extremeValueObject?.extremeValueId;

  console.log(
    `가장 큰 값으로 적용된 승리/패패 횟수: ${maxInningsToWin}회 - [${maxInningsToWinId}]`
  );
}

function showMinInningsToWin(): void {
  const extremeValueObject = getExtremeAttribute("inningsToWin", true);
  const minInningsToWin = extremeValueObject?.extremeValue;
  const minInningsToWinId = extremeValueObject?.extremeValueId;

  console.log(
    `가장 적은 값으로 적용된 승리/패패 횟수: ${minInningsToWin}회 - [${minInningsToWinId}]`
  );
}

function showAverageInning(): void {
  const sumOfInningsToWin = getGameRecords().reduce((sum, gameRecord) => {
    return (sum += gameRecord.inningsToWin);
  }, 0);

  const averageInningsToWin = (
    sumOfInningsToWin / getGameRecords().length
  ).toFixed(2);

  console.log(`적용된 승리/패패 횟수 평균: ${averageInningsToWin}회`);
}

function showComputerMostInningsToWin(): void {
  const mostAttributeObject = getMostAttribute("inningsToWin", [
    UserType.Computer,
  ]);
  const computerMostInningsToWin = mostAttributeObject?.mostValue;

  console.log(
    `컴퓨터가 가장 많이 승리한 승리/패패 횟수: ${computerMostInningsToWin}회`
  );
}

function showUserMostInningsToWin(): void {
  const mostAttributeObject = getMostAttribute("inningsToWin", [UserType.User]);
  const userMostInningsToWin = mostAttributeObject?.mostValue;

  console.log(
    `사용자가 가장 많이 승리한 승리/패패 횟수: ${userMostInningsToWin}회`
  );
}

function getExtremeAttribute(
  attribute: keyof GameRecord,
  findMax: boolean
):
  | {
      extremeValue: number;
      extremeValueId: number;
    }
  | undefined {
  const gameRecords = getGameRecords();
  if (gameRecords === undefined || gameRecords.length === 0) {
    return;
  }

  let extremeValueId: number = 0;
  const extremeValue = gameRecords.reduce(
    (nextExtremeValue, gameRecord) => {
      if (typeof gameRecord[attribute] !== "number") {
        return nextExtremeValue;
      }
      if (findMax) {
        nextExtremeValue = Math.max(nextExtremeValue, gameRecord[attribute]);
      } else {
        nextExtremeValue = Math.min(nextExtremeValue, gameRecord[attribute]);
      }

      if (nextExtremeValue === gameRecord[attribute]) {
        extremeValueId = gameRecord.id;
      }

      return nextExtremeValue;
    },
    findMax ? -Infinity : Infinity
  );

  if (extremeValue === -Infinity || extremeValue === Infinity) {
    return undefined;
  }

  return { extremeValue, extremeValueId };
}

function getMostAttribute(
  attribute: keyof GameRecord,
  userTypes: UserType[]
):
  | {
      mostValue: number;
      mostValueId: number;
    }
  | undefined {
  if (getGameRecords() === undefined) {
    return;
  }

  const frequencyMap: Map<number, number[]> = new Map();

  getGameRecords().forEach((gameRecord) => {
    if (!userTypes.includes(gameRecord.winner)) {
      return;
    }
    if (typeof gameRecord[attribute] !== "number") {
      return;
    }

    const frequencyArray = frequencyMap.get(gameRecord[attribute]);

    if (frequencyArray === undefined) {
      frequencyMap.set(gameRecord[attribute], [gameRecord.id]);
    }
    frequencyArray?.push(gameRecord.id);
  });

  let mostValue = 0;
  let mostValueId = 0;
  let mostFrequency: number = -Infinity;

  frequencyMap.forEach((ids, attribute) => {
    mostFrequency = Math.max(mostFrequency, ids.length);
    if (mostFrequency === ids.length) {
      mostValue = attribute;
      mostValueId = ids[ids.length - 1];
    }
  });

  return { mostValue, mostValueId };
}

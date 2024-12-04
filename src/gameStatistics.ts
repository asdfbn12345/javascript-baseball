import { GameRecorder } from "./gameRecorder";
import { UserType } from "./types/enums";
import { NumberProperties } from "./types/interfaces";
import { STATISTICS_MESSAGES, MESSAGES_BAR } from "./types/constants";

export class GameStatistics {
  private static instance: GameStatistics;
  private gameRecorder: GameRecorder;

  constructor() {
    this.gameRecorder = GameRecorder.getInstance();
  }

  public static getInstance(): GameStatistics {
    if (!GameStatistics.instance) {
      GameStatistics.instance = new GameStatistics();
    }
    return GameStatistics.instance;
  }

  public showStatistics(): void {
    console.log(MESSAGES_BAR.STATISTICS_BAR);
    if (this.gameRecorder.getGameRecordsLength() === 0) {
      console.log(STATISTICS_MESSAGES.NO_DATA);
    } else {
      this.showLeastInning();
      this.showMostInning();
      this.showMostInningsToWin();
      this.showMaxInningsToWin();
      this.showMinInningsToWin();
      this.showAverageInning();
      this.showComputerMostInningsToWin();
      this.showUserMostInningsToWin();
    }
    console.log(MESSAGES_BAR.BAR);
  }

  private showLeastInning(): void {
    const { extremeValue, extremeValueId } = this.getExtremeAttribute("lastInning" as NumberProperties, false);
    console.log(STATISTICS_MESSAGES.LEAST_INNINGS(extremeValue, extremeValueId));
  }

  private showMostInning(): void {
    const { extremeValue, extremeValueId } = this.getExtremeAttribute("lastInning" as NumberProperties, true);
    console.log(STATISTICS_MESSAGES.MOST_INNINGS(extremeValue, extremeValueId));
  }

  private showMostInningsToWin(): void {
    const { mostValue, mostValueId } = this.getMostAttribute("inningsToWin" as NumberProperties);
    console.log(STATISTICS_MESSAGES.MOST_INNINGS_TO_WIN(mostValue, mostValueId));
  }

  private showMaxInningsToWin(): void {
    const { extremeValue, extremeValueId } = this.getExtremeAttribute("inningsToWin" as NumberProperties, true);
    console.log(STATISTICS_MESSAGES.MAX_INNINGS_TO_WIN(extremeValue, extremeValueId));
  }

  private showMinInningsToWin(): void {
    const { extremeValue, extremeValueId } = this.getExtremeAttribute("inningsToWin" as NumberProperties, false);
    console.log(STATISTICS_MESSAGES.MIN_INNINGS_TO_WIN(extremeValue, extremeValueId));
  }

  private showAverageInning(): void {
    const records = this.gameRecorder.getGameRecords();
    if (records.length === 0) {
      console.log(STATISTICS_MESSAGES.AVERAGE_INNINGS_TO_WINS("0"));
      return;
    }

    const average = (records.reduce((sum, record) => sum + record.inningsToWin, 0) / records.length).toFixed(2);
    console.log(STATISTICS_MESSAGES.AVERAGE_INNINGS_TO_WINS(average));
  }

  private showComputerMostInningsToWin(): void {
    const { mostValue } = this.getMostAttribute("inningsToWin" as NumberProperties, UserType.Computer);
    console.log(STATISTICS_MESSAGES.INNINGS_TO_WIN_COMPUTER_MOST_WINS(mostValue));
  }

  private showUserMostInningsToWin(): void {
    const { mostValue } = this.getMostAttribute("inningsToWin" as NumberProperties, UserType.User);
    console.log(STATISTICS_MESSAGES.INNINGS_TO_WIN_USER_MOST_WINS(mostValue));
  }

  private getExtremeAttribute(attribute: NumberProperties, isFindMax: boolean): { extremeValue: number; extremeValueId: number } {
    const gameRecords = this.gameRecorder.getGameRecords();
    if (gameRecords.length === 0) {
      return { extremeValue: 0, extremeValueId: 0 };
    }
  
    let extremeValue = gameRecords[0][attribute];
    let extremeValueId = gameRecords[0].id;
  
    gameRecords.forEach((record) => {
      const currentValue = record[attribute];
      if (isFindMax ? currentValue >= extremeValue : currentValue <= extremeValue) {
        extremeValue = currentValue;
        extremeValueId = record.id;
      }
    });
  
    return { extremeValue, extremeValueId };
  }

  private getMostAttribute(attribute: NumberProperties, userType: UserType | null = null): { mostValue: number; mostValueId: number } {
    const gameRecords = this.gameRecorder.getGameRecords();
    const filteredRecords = userType ? gameRecords.filter(record => record.winner === userType) : gameRecords;

    if (filteredRecords.length === 0) {
        return { mostValue: 0, mostValueId: 0 };
    }

    const frequencyMap = new Map<number, number[]>();
    const firstRecord = filteredRecords[0];
    let mostValue = firstRecord[attribute];
    let mostValueId = firstRecord.id;
    let maxFrequency = 1;

    filteredRecords.forEach((gameRecord) => {
      const value = gameRecord[attribute];
      const ids = frequencyMap.get(value) ?? [];
      frequencyMap.set(value, [...ids, gameRecord.id]);

      const currentFrequency = frequencyMap.get(value)?.length ?? 0;
      if (currentFrequency >= maxFrequency) {
        maxFrequency = currentFrequency;
        mostValue = value;
        mostValueId = gameRecord.id;
      }
    });

    return { mostValue, mostValueId };
  }
}
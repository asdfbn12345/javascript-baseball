import { GameStatistics } from "../gameStatistics";
import { GameRecorder } from "../gameRecorder";
import { MESSAGES_BAR, STATISTICS_MESSAGES } from "../types/constants";
import { UserType } from "../types/enums";
//import { GameRecord } from "../types/interfaces";
//import { UserType } from "../types/enums";

jest.mock("../gameRecorder");

describe('GameStatistics', () => {
  let gameStats: GameStatistics;
  let mockGameRecorder: jest.Mocked<GameRecorder>;


  beforeEach(() => {
    mockGameRecorder = {
      getInstance: jest.fn(),
      getGameRecords: jest.fn().mockReturnValue([
        { id: 1, lastInning: 1, startTime: new Date(), endTime: new Date(), inningsToWin: 3, winner: UserType.User },
        { id: 2, lastInning: 5, startTime: new Date(), endTime: new Date(), inningsToWin: 5, winner: UserType.User },
        { id: 3, lastInning: 4, startTime: new Date(), endTime: new Date(), inningsToWin: 4, winner: UserType.Computer },
      ]),
      getGameRecordsLength: jest.fn().mockReturnValue(3),
      getCurrentGameRecord: jest.fn(),
      startNewRecord: jest.fn(),
      endRecord: jest.fn(),
      showHistory: jest.fn(),
    } as unknown as jest.Mocked<GameRecorder>;

    jest.spyOn(console, 'log').mockImplementation();

    (GameRecorder.getInstance as jest.Mock).mockReturnValue(mockGameRecorder);
    gameStats = GameStatistics.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('getInstance는 싱글톤 인스턴스를 반환해야 함', () => {
    const instance1 = GameStatistics.getInstance();
    const instance2 = GameStatistics.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('GameStatistics 통계 출력', () => {
    gameStats.showStatistics();

    expect(console.log).toHaveBeenCalledWith(MESSAGES_BAR.STATISTICS_BAR);
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.LEAST_INNINGS(1, 1));
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.MOST_INNINGS(5, 2));
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.MOST_INNINGS_TO_WIN(4, 3));
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.MAX_INNINGS_TO_WIN(5, 2));
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.MIN_INNINGS_TO_WIN(3, 1));
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.AVERAGE_INNINGS_TO_WINS("4.00"));
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.INNINGS_TO_WIN_COMPUTER_MOST_WINS(4));
    expect(console.log).toHaveBeenCalledWith(STATISTICS_MESSAGES.INNINGS_TO_WIN_USER_MOST_WINS(5));
    expect(console.log).toHaveBeenCalledWith(MESSAGES_BAR.BAR);
  });

}); 
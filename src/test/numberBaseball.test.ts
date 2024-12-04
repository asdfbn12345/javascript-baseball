import { NumberBaseballGame } from "../numberBaseball";
import { GameRecorder } from "../gameRecorder";
import { GameStatistics } from "../gameStatistics";
import { GameRecord } from "../types/interfaces";

jest.mock("../user-input");
jest.mock("../gameRecorder");
jest.mock("../gameStatistics");

type MockedGameRecorder = {
  getInstance?: jest.Mock;
  startNewRecord?: jest.Mock;
  endRecord?: jest.Mock;
  getGameRecords?: jest.Mock;
  getCurrentGameRecord?: jest.Mock;
  getGameRecordsLength?: jest.Mock;
  showHistory?: jest.Mock;
  gameRecords: GameRecord[];
  currentGameRecord: GameRecord | null;
};

type MockedGameStats = {
  getInstance?: jest.Mock;
  showStatistics?: jest.Mock;
  gameRecorder: GameRecorder;
  showLeastInning?: jest.Mock;
  showMostInning?: jest.Mock;
  showMostInningsToWin?: jest.Mock;
  showMaxInningsToWin?: jest.Mock;
  showMinInningsToWin?: jest.Mock;
  showAverageInning?: jest.Mock;
  showComputerMostInningsToWin?: jest.Mock;
  showUserMostInningsToWin?: jest.Mock;
};

describe('NumberBaseballGame', () => {
  let game: NumberBaseballGame;
  let mockGameRecorder: MockedGameRecorder;
  let mockGameStats: MockedGameStats;

  beforeEach(() => {
    mockGameRecorder = {
      getInstance: jest.fn(),
      startNewRecord: jest.fn(),
      endRecord: jest.fn(),
      gameRecords: [],
      currentGameRecord: null
    };

    mockGameStats = {
      getInstance: jest.fn(),
      showStatistics: jest.fn(),
      gameRecorder: mockGameRecorder as unknown as GameRecorder
    };

    game = new NumberBaseballGame(
      mockGameRecorder as unknown as GameRecorder, 
      mockGameStats as unknown as GameStatistics
    );
  });

  type PrivateMethod = {
    getStrikeCount(userNumbers: number[], computerNumbers: number[]): number;
    getBallCount(userNumbers: number[], computerNumbers: number[]): number;
    isOut(strikeCount: number, ballCount: number): boolean;
  };

  test('게임에서 스트라이크 카운트를 정확히 계산해야 함', () => {
    const privateMethod = (game as unknown) as PrivateMethod;
    const userNumbers = [1, 2, 3];
    const computerNumbers = [1, 2, 4];
    
    const result = privateMethod.getStrikeCount(userNumbers, computerNumbers);
    expect(result).toBe(2);
  });

  test('게임에서 볼 카운트를 정확히 계산해야 함', () => {
    const privateMethod = (game as unknown) as PrivateMethod;
    const userNumbers = [1, 2, 3];
    const computerNumbers = [2, 3, 1];
    
    const result = privateMethod.getBallCount(userNumbers, computerNumbers);
    expect(result).toBe(3);
  });

  test('아웃 상황을 정확히 판단해야 함', () => {
    const privateMethod = (game as unknown) as PrivateMethod;
    const result = privateMethod.isOut(0, 0);
    expect(result).toBe(true);
  });
}); 
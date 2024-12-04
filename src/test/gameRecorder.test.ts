import { GameRecorder } from "../gameRecorder";
import { MESSAGES_BAR, RECORD_MESSAGES } from "../types/constants";
import { UserType } from "../types/enums";

describe('GameRecorder', () => {
  let gameRecorder: GameRecorder;

  beforeEach(() => {
    gameRecorder = GameRecorder.getInstance();
  });

  test('getInstance는 싱글톤 인스턴스를 반환해야 함', () => {
    const instance1 = GameRecorder.getInstance();
    const instance2 = GameRecorder.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('새 게임 기록은 GameRecord 타입이어야 함', () => {
    const inningsToWin = 5;
    gameRecorder.startNewRecord(inningsToWin);
    const currentRecord = gameRecorder.getCurrentGameRecord();

    expect(currentRecord).not.toBeNull();
    expect(currentRecord?.inningsToWin).toBe(inningsToWin);
    expect(currentRecord?.startTime).toBeInstanceOf(Date);
    expect(currentRecord?.endTime).toBeNull();
    expect(currentRecord?.winner).toBeNull();
  });

  test('게임이 적절히 기록되어야 함', () => {
    const inningsToWin = 5;
    const lastInning = 3;
    const isUserWin = true;

    gameRecorder.startNewRecord(inningsToWin);
    gameRecorder.endRecord(isUserWin, lastInning);

    const records = gameRecorder.getGameRecords();
    const lastRecord = records[records.length - 1];

    expect(lastRecord.lastInning).toBe(lastInning);
    expect(lastRecord.winner).toBe(UserType.User);
    expect(lastRecord.endTime).toBeInstanceOf(Date);
  });

  test('게임 기록 없이 종료하려고 하면 에러가 발생해야 함', () => {
    expect(() => {
      gameRecorder.endRecord(true, 3);
    }).toThrow(RECORD_MESSAGES.NOT_STARTED_ERROR);
  });

  test('showHistory는 게임 기록이 없을 때 빈 히스토리를 보여줘야 함', () => {
    // Given
    const consoleSpy = jest.spyOn(console, 'log');
    
    // When
    gameRecorder.showHistory();
    
    // Then
    expect(consoleSpy).toHaveBeenCalledWith(MESSAGES_BAR.HISTORY_BAR);
    expect(consoleSpy).toHaveBeenCalledWith(MESSAGES_BAR.BAR);
    expect(consoleSpy).toHaveBeenCalledTimes(2); // 게임 기록이 없으므로 바 2개만 출력
  });

  test('showHistory는 모든 게임 기록을 올바른 형식으로 출력해야 함', () => {
    // Given
    const consoleSpy = jest.spyOn(console, 'log');
    const startTime = new Date('2024-03-20T14:30:00');
    const endTime = new Date('2024-03-20T14:35:00');
    
    // 게임 기록 생성
    gameRecorder.startNewRecord(5);
    // @ts-expect-error - private 속성 접근을 위해
    gameRecorder.currentGameRecord.startTime = startTime;
    gameRecorder.endRecord(true, 3);
    // @ts-expect-error - private 속성 접근을 위해
    const lastRecord = gameRecorder.gameRecords[gameRecorder.gameRecords.length - 1] as GameRecord;
    lastRecord.endTime = endTime;

    // When
    gameRecorder.showHistory();

    // Then
    expect(consoleSpy).toHaveBeenCalledWith(MESSAGES_BAR.HISTORY_BAR);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[1]')); // 게임 ID
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('2024. 03. 20 14:30')); // 시작 시간
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('2024. 03. 20 14:35')); // 종료 시간
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('횟수: 3')); // 이닝 수
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(UserType.User)); // 승자
    expect(consoleSpy).toHaveBeenCalledWith(MESSAGES_BAR.BAR);
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-expect-error - private 속성 초기화
    gameRecorder.gameRecords = [];
    // @ts-expect-error - private 속성 초기화
    gameRecorder.currentGameRecord = null;
  });
}); 
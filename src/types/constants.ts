export const MENU = {
  StartGame: "1",
  GameHistory: "2",
  GameStatistics: "3",
  ExitApplication: "9"
} as const;

export const MESSAGES_BAR = {
  HISTORY_BAR:    "===================History====================",
  STATISTICS_BAR: "==================Statistics==================",
  BAR:            "==============================================",
} as const;

export const USER_INPUT_MESSAGES = {
  ASK_MENU: `게임을 새로 시작하려면 ${MENU.StartGame}, 게임 기록을 보려면 ${MENU.GameHistory}, 통계를 보려면 ${MENU.GameStatistics}, 종료하려면 ${MENU.ExitApplication}를 입력하세요. `,
  INVALID_MENU: "올바른 메뉴를 입력하세요.",
  INVALID_NUMBER: "숫자를 입력하세요.",
  INPUT_NUMBER: (length: number) => `숫자 ${length}개를 입력하세요: `,
  INVALID_LENGTH: "입력 길이가 올바르지 않습니다.",
  INVALID_DUPLICATE: "입력값은 중복되지 않아야 합니다.",
  ASK_INNINGS_TO_WIN: "컴퓨터에게 승리하기 위해 몇번만에 성공해야 하나요? ",
  SET_INNINGS_TO_WIN: (value: number) => `이닝 수를 ${value}로 설정했습니다.`,
} as const;

export const RECORDER_MESSAGES = {
  NOT_STARTED_ERROR: "게임이 시작되지 않았습니다.",
  INVALID_INNINGS_ERROR: "유효하지 않은 이닝 수입니다.",
} as const;

export const STATISTICS_MESSAGES = {
  NO_DATA: "통계를 출력할 데이터가 없습니다.",
  ERROR: "통계 생성 중 오류가 발생했습니다:",
  LEAST_INNINGS: (value: number, id: number) => `가장 적은 횟수: ${value}회 - [${id}]`,
  MOST_INNINGS: (value: number, id: number) => `가장 많은 횟수: ${value}회 - [${id}]`,
  MOST_INNINGS_TO_WIN: (value: number, id: number) => `가장 많이 적용된 승리/패패 횟수: ${value}회 - [${id}]`,
  MAX_INNINGS_TO_WIN: (value: number, id: number) => `가장 큰 값으로 적용된 승리/패패 횟수: ${value}회 - [${id}]`,
  MIN_INNINGS_TO_WIN: (value: number, id: number) => `가장 적은 값으로 적용된 승리/패패 횟수: ${value}회 - [${id}]`,
  AVERAGE_INNINGS_TO_WINS: (average: string) => `적용된 승리/패패 횟수 평균: ${average}회`,
  INNINGS_TO_WIN_COMPUTER_MOST_WINS: (value: number) => `컴퓨터가 가장 많이 승리한 승리/패패 횟수: ${value}회`,
  INNINGS_TO_WIN_USER_MOST_WINS: (value: number) => `사용자가 가장 많이 승리한 승리/패패 횟수: ${value}회`,
} as const;



export const SINGLE_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const MAX_DIGITS = 3;
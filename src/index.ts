import { NumberBaseballGame } from "./numberBaseball";

async function main() {
  const game = new NumberBaseballGame();
  await game.applicationStart();
}

main();

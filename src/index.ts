import { GameManager } from "./game-manager/game-manager";
import { consoleIOHanlder } from "./IO/console-io-handler";
import { DefaultGameManagerOutputHandler } from "./game-manager/game-io-handlers/default-output-handler";
import { DefaultGameManagerInputHandler } from "./game-manager/game-io-handlers/default-input-handler";
import { Game } from "./game";
import { SolverFactory } from "./solvers/solver.factory";

const amoutOfPoles = 3;
const amountOfDisks = 8;
const inputHandler = new DefaultGameManagerInputHandler(consoleIOHanlder);
const outputHandler = new DefaultGameManagerOutputHandler(consoleIOHanlder);
const solverFactory = new SolverFactory();

// const game: Game = new Game(amoutOfPoles, amountOfDisks)
// const gameManager = new GameManager(game, inputHandler, outputHandler);
// gameManager.run();

for (let i = 3; i < 10; i++) {
    const game = new Game(amoutOfPoles, i);
    const solver = solverFactory.create(game);
    solver.solve();
    console.log(`${i} - ${game.currAmountOfMoves}`);
}
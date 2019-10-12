import { GameManager } from "./game-manager/game-manager";
import { consoleIOHanlder } from "./IO/console-io-handler";
import { DefaultGameManagerOutputHandler } from "./game-manager/game-io-handlers/default-output-handler";
import { DefaultGameManagerInputHandler } from "./game-manager/game-io-handlers/default-input-handler";
import { Game } from "./game";
import { SolverFactory } from "./solvers/solver.factory";

const amoutOfPoles = 3;
const amountOfDisks = 5;
const inputHandler = new DefaultGameManagerInputHandler(consoleIOHanlder);
const outputHandler = new DefaultGameManagerOutputHandler(consoleIOHanlder);
const solverFactory = new SolverFactory();

const gameManager = new GameManager(amoutOfPoles, amountOfDisks, inputHandler, outputHandler);

// gameManager.run();
const game = new Game(amoutOfPoles, amountOfDisks);
const solver = solverFactory.create(game);
debugger;
solver.solve();
outputHandler.printBoard(game);
import { GameManager } from "./game-manager/game-manager";
import { consoleIOHanlder } from "./IO/console-io-handler";
import { DefaultGameManagerOutputHandler } from "./game-manager/game-io-handlers/default-output-handler";
import { DefaultGameManagerInputHandler } from "./game-manager/game-io-handlers/default-input-handler";

const amoutOfPoles = 3;
const amountOfDisks = 3;
const inputHandler = new DefaultGameManagerInputHandler(consoleIOHanlder);
const outputHandler = new DefaultGameManagerOutputHandler(consoleIOHanlder);

const gameManager = new GameManager(amoutOfPoles, amountOfDisks, inputHandler, outputHandler);

gameManager.run();

import { IOHandler } from "../../interfaces";
import { GameManagerInputHandler, Move } from "../interfaces";

export class DefaultGameManagerInputHandler implements GameManagerInputHandler {
    constructor(private ioHandler: IOHandler) {
    }

    public async readMove(): Promise<Move> {
        const fromIndex = Number(await this.ioHandler.read('fromIndex:'));
        if (isNaN(fromIndex)) {
            throw new Error('Index must be numeric value');
        }

        const toIndex = Number(await this.ioHandler.read('toIndex:'));
        if (isNaN(toIndex)) {
            throw new Error('Index must be numeric value');
        }

        return {
            fromIndex,
            toIndex
        }
    }
}
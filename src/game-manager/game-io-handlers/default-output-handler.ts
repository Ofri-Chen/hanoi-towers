import { IOHandler, Disk } from "../../interfaces";
import { GameManagerOutputHandler } from "../interfaces";
import { Game } from "../../game";

export class DefaultGameManagerOutputHandler implements GameManagerOutputHandler {
    constructor(private ioHandler: IOHandler) {
    }

    public async printBoard(game: Game): Promise<any> {
        await this.ioHandler.writeLine(`currMoves: ${game.currAmountOfMoves}`);

        for (let [i, pole] of game.poles.entries()) {
            this.ioHandler.writeLine(`--${i}`);
            let disk: Disk;
            while (disk = pole.disks.pop()) {
                await this.ioHandler.writeLine(disk.size);
            }
        }
    }

    public async printWinningMessage(game: Game): Promise<any> {
        this.ioHandler.writeLine('-----------------------------------------');
        await this.ioHandler.writeLine(`Game won in ${game.currAmountOfMoves} moves !!`);
        this.ioHandler.writeLine('-----------------------------------------');
    }
}
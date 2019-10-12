 import { IOHandler, Disk, Pole } from "../../interfaces";
import { GameManagerOutputHandler } from "../interfaces";
import { Game } from "../../game";
import { range } from "../../utils";

export class DefaultGameManagerOutputHandler implements GameManagerOutputHandler {
    private _polesDelimiter = ' | ';

    constructor(private ioHandler: IOHandler) {
    }

    public async printBoard(game: Game): Promise<any> {
        await this.ioHandler.writeLine(`currMoves: ${game.currAmountOfMoves}`);
        await this.printHeaders(game.poles.length);
        await this.printPoles(game.poles);

    }

    public async printWinningMessage(game: Game): Promise<any> {
        await this.ioHandler.writeLine('-----------------------------------------');
        await this.ioHandler.writeLine(`Game won in ${game.currAmountOfMoves} moves !!`);
        await this.ioHandler.writeLine('-----------------------------------------');
    }

    private async printHeaders(amountOfPoles: number): Promise<void> {
        const headers = range(0, amountOfPoles);
        await this.ioHandler.writeLine(headers.join(this._polesDelimiter));
        const amountOfCharactersInHeader = amountOfPoles + (amountOfPoles - 1) * this._polesDelimiter.length;
        await this.ioHandler.writeLine(range(0, amountOfCharactersInHeader).map(() => '').join('-') + '-');
    }

    private async printPoles(poles: Pole[]): Promise<void> {
        const highestPoleStackSize = Math.max(...poles.map(pole => pole.disks.length));

        for (let i = highestPoleStackSize - 1; i >= 0; i--) {
            let currRowValuesToPrint = poles.map(pole => {
                return pole.disks.length > i ? pole.disks[i].size : ' ';
            });

            await this.ioHandler.writeLine(currRowValuesToPrint.join(this._polesDelimiter));
        }
    }
}
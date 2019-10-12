import * as _ from 'lodash';
import { Game } from "../game";
import { SolverBase } from "./solver-base";
import { DefaultGameManagerOutputHandler } from '../game-manager/game-io-handlers/default-output-handler';
import { consoleIOHanlder } from '../IO/console-io-handler';
import { Pole } from '../interfaces';
import { range } from '../utils';

export class ThreePolesSolver extends SolverBase {
    private _polesDelimiter = ' | ';

    constructor(game: Game) {
        super(game);
    }

    public solve(): void {
        this.moveToPole(0, 2, 0);
    }

    private moveToPole(fromIndex: number, toIndex: number, diskIndex: number) {
        debugger;
        this.printBoard();
        const freePole = this.getRemainingFreePole(fromIndex, toIndex);
        const poles = this.game.poles;
        const fromPoleDisks = poles[fromIndex].disks;

        if (poles[toIndex].disks.length > 0 && poles[toIndex].disks.peek().size < fromPoleDisks[diskIndex].size) {
            this.moveToPole(toIndex, freePole, 0);
            this.moveToPole(fromIndex, toIndex, diskIndex);
            this.moveToPole(freePole, toIndex, 0);
        }
        if (_.get(fromPoleDisks[diskIndex], 'size') === 2) {
            this.solveTwo(fromIndex, toIndex, freePole);
        } else if (fromPoleDisks.length - 1 === diskIndex) {
            console.log(`${fromIndex} => ${toIndex}`);
            this.game.moveDisk(fromIndex, toIndex);
        } else {
            this.moveToPole(fromIndex, freePole, diskIndex + 1);
            this.moveToPole(fromIndex, toIndex, diskIndex);
            this.moveToPole(freePole, toIndex, 0);
        }
    }

    private solveTwo(fromIndex: number, toIndex: number, freePole: number) {
        console.log(`solve two - ${fromIndex} => ${toIndex}`);
        this.game.moveDisk(fromIndex, freePole);
        this.game.moveDisk(fromIndex, toIndex);
        this.game.moveDisk(freePole, toIndex);
    }

    private getRemainingFreePole(toIndex: number, fromIndex: number): number {
        return 3 - toIndex - fromIndex;
    }

    public printBoard(): any {
        console.log(`currMoves: ${this.game.currAmountOfMoves}`);
        this.printHeaders(this.game.poles.length);
        this.printPoles(this.game.poles);

    }

    public printWinningMessage(game: Game): any {
        console.log('-----------------------------------------');
        console.log(`Game won in ${game.currAmountOfMoves} moves !!`);
        console.log('-----------------------------------------');
    }

    private printHeaders(amountOfPoles: number): void {
        const headers = range(0, amountOfPoles);
        console.log(headers.join(this._polesDelimiter));
        const amountOfCharactersInHeader = amountOfPoles + (amountOfPoles - 1) * this._polesDelimiter.length;
        const aa = range(0, amountOfCharactersInHeader).map(() => '').join('-') + '-';
        console.log(aa);
    }

    private printPoles(poles: Pole[]): void {
        const highestPoleStackSize = Math.max(...poles.map(pole => pole.disks.length));

        for (let i = highestPoleStackSize - 1; i >= 0; i--) {
            let currRowValuesToPrint = poles.map(pole => {
                return pole.disks.length > i ? pole.disks[i].size : ' ';
            });

            console.log(currRowValuesToPrint.join(this._polesDelimiter))
        }
    }
}

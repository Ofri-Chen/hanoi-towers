import * as _ from 'lodash';
import { Game } from "../game";
import { SolverBase } from "./solver-base";

export class ThreePolesSolver extends SolverBase {
    constructor(game: Game) {
        super(game);
    }

    public solve(): void {
        this.moveToPole(0, 2, 0);
    }

    private moveToPole(fromIndex: number, toIndex: number, diskIndex: number) {
        const freePole = this.getRemainingFreePole(fromIndex, toIndex);
        const poles = this.game.poles;
        const fromPoleDisks = poles[fromIndex].disks;

        if (_.get(fromPoleDisks[diskIndex], 'size') === 2) {
            this.solveTwo(fromIndex, toIndex, freePole);
        } else if (fromPoleDisks.length - 1 === diskIndex) {
            this.game.moveDisk(fromIndex, toIndex);
        } else {
            let moveFromIndex = 0;
            if (poles[toIndex].disks.length > 0 && poles[toIndex].disks.peek().size < fromPoleDisks[diskIndex].size) {
                const diskToMoveFrom = poles[toIndex].disks.findIndex(disk => disk.size < fromPoleDisks[diskIndex].size);
                this.moveToPole(toIndex, freePole, diskToMoveFrom);
            } else {
                moveFromIndex = this.game.poles[freePole].disks.length;
                this.moveToPole(fromIndex, freePole, diskIndex + 1);
            }
            this.moveToPole(fromIndex, toIndex, diskIndex);
            this.moveToPole(freePole, toIndex, moveFromIndex);
        }
    }

    private solveTwo(fromIndex: number, toIndex: number, freePole: number) {
        this.game.moveDisk(fromIndex, freePole);
        this.game.moveDisk(fromIndex, toIndex);
        this.game.moveDisk(freePole, toIndex);
    }

    private getRemainingFreePole(toIndex: number, fromIndex: number): number {
        return 3 - toIndex - fromIndex;
    }
}

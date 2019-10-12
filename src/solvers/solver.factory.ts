import { SolverBase } from "./solver-base";
import { Game } from "../game";
import { ThreePolesSolver } from "./three-poles-solver";

export class SolverFactory {
    private _solverMapping: Record<number, typeof SolverBase> = {
        3: ThreePolesSolver
    }

    create(game: Game): SolverBase {
        const amountOfPoles = game.poles.length;
        const solver = this._solverMapping[amountOfPoles];

        if (!solver) {
            throw Error(`no available solver for ${amountOfPoles} poles :(`);
        }

        return new (solver as any)(game);
    }
}
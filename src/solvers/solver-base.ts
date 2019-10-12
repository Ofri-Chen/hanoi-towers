import { Game } from "../game";

export abstract class SolverBase {
    constructor(protected game: Game) {
    }
    abstract solve(): void;
}
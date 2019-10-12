import { Game } from "../game";

export interface GameManagerOutputHandler {
    printBoard: (game: Game) => Promise<void>;
    printWinningMessage: (game: Game) => Promise<void>;
}

export interface GameManagerInputHandler {
    readMove: () => Promise<Move>;    
}

export interface Move {
    fromIndex: number;
    toIndex: number;
}
import { Pole, OnGameFinishedCallback } from "./interfaces";
import { range, isInRange } from "./utils";
import { GameManagerOutputHandler } from "./game-manager/interfaces";
import * as _ from 'lodash';

export class Game {
    private _poles: Pole[] = [];
    private _isGameFinished: boolean = false;
    private _onGameFinishedCallbacks: OnGameFinishedCallback[] = [];

    public currAmountOfMoves: number = 0;

    public get poles(): Pole[] {
        return _.cloneDeep(this._poles);
    }

    constructor(private _amountOfPoles: number,
        private _amountOfDisks: number,
        _onGameFinished?: OnGameFinishedCallback) {
        this._poles = this.buildInitialState();
        if(_onGameFinished) {
            this._onGameFinishedCallbacks.push(_onGameFinished);
        }
    }

    public moveDisk(fromIndex: number, toIndex: number) {
        if (this._isGameFinished) return;

        this.validateMoveDiskInput(fromIndex, toIndex);
        this.currAmountOfMoves++;
        this._poles[toIndex].disks.push(this._poles[fromIndex].disks.pop());

        if (this.isGameFinished()) {
            this._isGameFinished = true;
            this._onGameFinishedCallbacks.forEach(callback => callback(this.currAmountOfMoves));
        }
    }

    public watchOnGameFinished(callback: OnGameFinishedCallback) {
        this._onGameFinishedCallbacks.push(callback);
    }

    private buildInitialState(): Pole[] {
        if (this._amountOfPoles < 3) {
            throw new Error('Invalid amount of poles - must be 3 or higher');
        }
        if (this._amountOfDisks < 3) {
            throw new Error('Invalid amount of disks - must be 3 or higher');
        }

        return [
            { disks: range(0, this._amountOfDisks).map(number => ({ size: this._amountOfDisks - number })) },
            ...range(0, this._amountOfPoles - 1).map(() => ({ disks: [] }))
        ]
    }

    private isGameFinished(): boolean {
        return this._poles.peek().disks.length === this._amountOfDisks;
    }

    private validateMoveDiskInput(fromIndex: number, toIndex: number): void {
        if (!isInRange(fromIndex, 0, this._amountOfPoles - 1)) {
            throw new Error(`Index out of range (fromIndex)`);
        }
        if (!isInRange(toIndex, 0, this._amountOfPoles - 1)) {
            throw new Error(`Index out of range (toIndex)`);
        }
        if (fromIndex === toIndex) {
            throw new Error(`fromIndex and toIndex have the same value`);
        }
        if (this._poles[fromIndex].disks.length === 0) {
            throw new Error(`The pole doesn't have any disks on it`);
        }
        if (this._poles[toIndex].disks.peek() < this._poles[fromIndex].disks.peek()) {
            throw new Error(`A Larger disk can't be placed on top of a smaller disk (${this._poles[toIndex].disks.peek()}, ${this._poles[fromIndex].disks.peek()})`);
        }
    }
}
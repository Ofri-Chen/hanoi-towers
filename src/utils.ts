export function range(start: number, end: number, incrementor: number = 1): number[] {
    const results = [];
    for (let i = start; i < end; i += incrementor) {
        results.push(i);
    }

    return results;
}

export function* lazyRange(start: number, end: number, incrementor: number = 1): IterableIterator<number> {
    for (let i = start; i < end; i++) {
        yield i;
        start += incrementor;
    }
}

export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

declare global {
    interface Array<T> {
        peek(): T;
    }
}

Array.prototype.peek = function () {
    return this[this.length - 1];
}

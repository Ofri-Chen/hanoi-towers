import { IOHandler } from "../interfaces";
import readline = require('readline');
import process = require('process');

export const consoleIOHanlder: IOHandler = {
    read: function(valueToPrint: any): Promise<string> {
        return askQuestion(valueToPrint);
    },
    writeLine: function(value: string): void {
        console.log(value);
    }
}

function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, (answer: string) => {
        rl.close();
        resolve(answer);
    }))
}

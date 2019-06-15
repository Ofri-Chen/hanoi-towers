export interface Pole {
    disks: Disk[];
}

export interface Disk {
    size: number;
}

export interface IOHandler {
    read(funcInput?: any): string | Promise<string>;
    writeLine(value: any): any | Promise<any>;
}
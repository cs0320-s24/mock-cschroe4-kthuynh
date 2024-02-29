/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
    (args: Array<string>): string[][] | string;
}


export class CommandRegistry {
    private commandMaps : Map<string, REPLFunction> = new Map;

    registerCommand(command : string, commandBody : REPLFunction): void {
        this.commandMaps.set(command, commandBody);
    }

    executeCommand(command : string, args : Array<string>): string[][] | string {
        if (!this.commandMaps.has(command)) {
            throw Error("Command does not exist!");
        } else {
            const func = this.commandMaps.get(command);
            return func!(args);
        }
    }
}
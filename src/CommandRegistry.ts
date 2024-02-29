/**
 * A command-processor function for our REPL. The function returns a string, 
 * which is the value to print to history when the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
    (args: Array<string>): string[][] | string;
}

/**
 * A command regristry that maintains a map of the possible commands.
 */
export class CommandRegistry {
    private commandMaps : Map<string, REPLFunction> = new Map;

    /**
     * Registers a command into the registry.
     * @param command The command name.
     * @param commandBody The command's function.
     */
    registerCommand(command : string, commandBody : REPLFunction): void {
        this.commandMaps.set(command, commandBody);
    }

    /**
     * Executes a command.
     * @param command The command to be executed.
     * @param args The arguments for the command.
     * @returns A string or 2d string array for the result.
     */
    executeCommand(command : string, args : Array<string>): string[][] | string {
        if (!this.commandMaps.has(command)) {
            throw Error("Command does not exist!");
        } else {
            const func = this.commandMaps.get(command);
            return func!(args);
        }
    }
}
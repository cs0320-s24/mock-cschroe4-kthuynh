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

//An interface for comands that return a class formatting name 
//that the developer wants associated wih the function's output
export interface FormattingFunction {    
    () : string;
}


export class CommandRegistry {
    private commandMaps : Map<string, REPLFunction> = new Map;
    private resultFormating : Map<string, FormattingFunction> = new Map; //Does this seem good to you keanu?

    registerCommand(command : string, commandBody : REPLFunction, comandFormating? : FormattingFunction): void {
        if(comandFormating){
            this.resultFormating.set(command, comandFormating);
        }
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

    executeGetFormatting(command : string) : string {
        if (!this.resultFormating.has(command)) {
            return '';
        } else {
            const func = this.resultFormating.get(command);
            return func!();
        }
    }
}
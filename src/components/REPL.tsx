import { useState } from 'react';
import { CSVCommandCreator } from '../CSVCommandCreator';
import { CommandRegistry } from '../CommandRegistry';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

/**
 * An interface that represents the format that a command returns, including
 * its command name, as well as the result of calling the command.
 */
export interface CommandResult {
  command : string,
  result : string | string[][]
}

/**
 * The REPL function
 * @returns A JSX element representing the REPL.
 */
export default function REPL() {
  // The list of commands.
  const [commands,setCommands] = useState<CommandResult[]>([]);
  // Whether or not the REPL is in brief mode.
  const [isBrief,setBrief] = useState<boolean>(true);
  // The registry of commands.
  const registry : CommandRegistry = new CommandRegistry;
  // A class that creates the commands related to CSV, adding them to the registry.
  const csvCommands : CSVCommandCreator = new CSVCommandCreator(registry);
  csvCommands.initalizeCommands();
  // Registers the "mode" command into the registry.
  registry.registerCommand("mode", () => {
    const newBrief = !isBrief;
    setBrief(newBrief);
    return newBrief ? "Current mode is: BRIEF" : "Current mode is: VERBOSE";
  });

  /**
   * The return method, which returns a JSX element representing the REPL.
   */
  return (
    <div className="repl">  
      <REPLHistory list={commands} isBrief={isBrief}/>
      <hr></hr>
      <REPLInput list={commands} setList={setCommands} registry={registry}/>
    </div>
  );
}

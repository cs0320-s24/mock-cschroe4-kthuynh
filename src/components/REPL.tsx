import { useState } from 'react';
import { CSVCommandCreator } from '../CSVCommandCreator';
import { CommandRegistry } from '../CommandRegistry';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export interface CommandResult {
  command : string,
  result : string | string[][]
}

export default function REPL() {
  const [commands,setCommands] = useState<CommandResult[]>([]);
  const [isBrief,setBrief] = useState<boolean>(true);

  const registry : CommandRegistry = new CommandRegistry;
  const csvCommands : CSVCommandCreator = new CSVCommandCreator(registry);
  csvCommands.initalizeCommands();
  registry.registerCommand("mode", () => {
    const newBrief = !isBrief;
    setBrief(newBrief);
    return newBrief ? "Current mode is: BRIEF" : "Current mode is: VERBOSE";
  });

  return (
    <div className="repl">  
      <REPLHistory list={commands} isBrief={isBrief}/>
      <hr></hr>
      <REPLInput list={commands} setList={setCommands} registry={registry}/>
    </div>
  );
}

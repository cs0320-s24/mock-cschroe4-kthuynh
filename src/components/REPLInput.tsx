import '../styles/main.css';
import { useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { CommandRegistry } from '../CommandRegistry';
import { CommandResult } from './REPL';

interface REPLInputProps{
  list : CommandResult[];
  setList : (list : CommandResult[]) => void;
  registry : CommandRegistry;
}

export function REPLInput(props : REPLInputProps) {
    const [commandString, setCommandString] = useState<string>('');

    function handleSubmit() : void {
      console.log(commandString);
      try {
        let parsedCommandString : string[] = commandString.split(" ");
        console.log(parsedCommandString);
        let result : CommandResult = {command : parsedCommandString[0], result : props.registry.executeCommand(parsedCommandString[0], parsedCommandString.slice(1))}
        console.log(result);
        props.setList([...props.list, result]);
      } catch {
        alert("This command does not exist!");
      }
      setCommandString('');
    }

    return (
        <div className="repl-input">
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
  }
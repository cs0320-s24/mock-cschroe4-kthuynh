import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { CommandRegistry } from '../CommandRegistry';
import { CommandResult } from './REPL';
import { CSVCommandCreator } from '../CSVCommandCreator';

interface REPLInputProps{
  list : CommandResult[];
  setList : (list : CommandResult[]) => void;
  registry : CommandRegistry;
}

export function REPLInput(props : REPLInputProps) {
    const [commandString, setCommandString] = useState<string>('');

    function handleSubmit() : void {
      try {
        let parsedCommandString : string[] = commandString.split(" ");
        let result : CommandResult = {command : parsedCommandString[0], result : props.registry.executeCommand(parsedCommandString[0], parsedCommandString.slice(1))}
        props.setList([...props.list, result]);
      } catch {
        alert("This command does not exist!");
      }
      setCommandString('');
    }

    return (
        <div className="repl-input">
            {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
            {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
  }
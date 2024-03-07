import '../styles/main.css';
import { useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { CommandRegistry } from '../CommandRegistry';
import { CommandResult } from './REPL';

/**
 * The properties for the REPL Input.
 */
interface REPLInputProps{
  list : CommandResult[];
  setList : (list : CommandResult[]) => void;
  registry : CommandRegistry;
}

/**
 * A function for the REPL Input component.
 * @param props The properties of the REPL Input.
 * @returns A JSX element representing the REPL Input.
 */
export function REPLInput(props : REPLInputProps) {
  // The current command string.
  const [commandString, setCommandString] = useState<string>('');

  /**
   * Handles the submit functionality.
   */
  function handleSubmit() : void {
    try {
      let parsedCommandString : string[] = commandString.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) || [];
      let result : CommandResult = {command : commandString, 
        result : props.registry.executeCommand(parsedCommandString[0], parsedCommandString.slice(1))}
      props.setList([...props.list, result]);
    } catch {
      alert("Invalid command. Check documentation for availible commands");
    }
    setCommandString('');
    document.getElementById("command-input")?.focus();
  }

  /**
   * The return method for the JSX element.
   */
  return (
      <div className="repl-input">
          <fieldset>
            <legend>Enter a command:</legend>
            <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
          </fieldset>
          <button onClick={handleSubmit} aria-label="submit">Submit</button>
      </div>
  );
}
import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * The properties for the controlled input.
 */
interface ControlledInputProps {
  value: string
  setValue: Dispatch<SetStateAction<string>>,
  ariaLabel: string 
}

/**
 * A function for the Controlled Input component.
 * @param param0 The properties.
 * @returns A JSX element representing the Controlled Input.
 */
export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
  return (
    <input type="text" className="repl-command-box"
          value={value} 
          id="command-input"
          placeholder="Enter command here!"
          onChange={(ev) => setValue(ev.target.value)}
          aria-label={ariaLabel}>
    </input>
  );
}
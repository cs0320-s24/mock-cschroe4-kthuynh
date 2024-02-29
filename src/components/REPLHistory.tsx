import '../styles/main.css';
import { CSVTableView } from './CSVTableView';
import { CommandResult } from './REPL';


interface REPLHistoryProps{
    list : CommandResult[]
    isBrief : boolean
    
}

export function REPLHistory(props : REPLHistoryProps) {

    function formatResult(result : CommandResult) : JSX.Element {
        if (Array.isArray(result.result)) {
            return <CSVTableView called_command={result.command} csvArray={result.result}/>
        } else {
            return <p>{result.result}</p>
        }
    }

    function handleFormat(result : CommandResult) : JSX.Element {
        if (props.isBrief) {
            return formatResult(result);
        } else {
            return (
            <div className="result-box">
                <p><b><u>Command</u></b></p>
                <p>{result.command}</p>
                <p><b><u>Output</u></b></p>
                {formatResult(result)}
            </div>);
        }
    }

    return (
        <div className="repl-history">
            {props.list.map((value,index) => {
                return <div key={index}>{handleFormat(value)}</div>;
            })}
        </div>
    );
}
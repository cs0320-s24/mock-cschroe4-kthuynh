import '../styles/main.css';
import { CommandResult } from './REPL';


interface REPLHistoryProps{
    list : CommandResult[]
    isBrief : boolean
    
}

export function REPLHistory(props : REPLHistoryProps) {

    function formatResult(result : string[][] | string, formatID : string) : JSX.Element {
        if (Array.isArray(result)) {
            return (
            <table >
                <tbody>
                {
                    result.map(row => {
                        return <tr>{ // TODO if we can extract the hasHeader value we can do className={ hasHeader ? 'header' : ''} to format it differently in view
                            row.map(value => {
                                return <td>{value}</td>
                            })    
                        }
                        </tr>
                    })
                }
                </tbody>
            </table>);
        } else {
            return <p>{result}</p>
        }
    }

    function handleFormat(result : CommandResult) : JSX.Element {
        if (props.isBrief) {
            return formatResult(result.result, result.formatID);
        } else {
            return (
            <div className="result-box">
                <p><b><u>Command</u></b></p>
                <p>{result.command}</p>
                <p><b><u>Output</u></b></p>
                {formatResult(result.result, result.formatID)}
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
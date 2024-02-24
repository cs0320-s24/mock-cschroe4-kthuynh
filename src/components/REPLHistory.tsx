import '../styles/main.css';
import { CommandResult } from './REPL';


interface REPLHistoryProps{
    list : CommandResult[]
    isBrief : boolean
    
}

export function REPLHistory(props : REPLHistoryProps) {

    function formatResult(result : string[][] | string) : JSX.Element {
        if (Array.isArray(result)) {
            return (
            <table>
                <tbody>
                {
                    result.map(row => {
                        return <tr>{
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
            return formatResult(result.result);
        } else {
            return (
            <div>
                <p><b>Command</b>: {result.command}</p>
                {formatResult(result.result)}
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
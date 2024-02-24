import '../styles/main.css';
import {getCSV} from '../../mocked_data/mockedJson'
import { CommandResult } from './REPL';


interface REPLHistoryProps{
    list : CommandResult[]
}

export function REPLHistory(props : REPLHistoryProps) {

    function handleFormat(result : CommandResult) : JSX.Element {
        if (Array.isArray(result.result)) {
            let csv : string[][] | null = getCSV("data/mockedCSV");
            return (
            <table>
                <tbody>
                {
                    csv.map(row => {
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
            return <p>{result.result}</p>
        }
    }

    return (
        <div className="repl-history">
            {props.list.map((value,index) => {
                return <p key={index}>{handleFormat(value)}</p>;
            })}
        </div>
    );
}
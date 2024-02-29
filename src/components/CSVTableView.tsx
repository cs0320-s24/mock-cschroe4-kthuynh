import '../styles/main.css';
import { getHeader } from '../../mocked_data/mockedCSVFunc';

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
  interface CSVTableViewProps {
    csvArray: string[][]
  }
  
  // Input boxes contain state. We want to make sure React is managing that state,
  // so we have a special component that wraps the input box.
  export function CSVTableView(props: CSVTableViewProps) {
    const header : boolean = getHeader();

    function handleTable() : JSX.Element {
        return (<table >
            <tbody>
            {
                props.csvArray.map(row => {
                    return <tr>{
                        row.map(value => {
                            return <td>{value}</td>
                        })    
                    }
                    </tr>
                })
            }
            </tbody>
        </table>)
    }

    return (
      <input type="text" className="repl-command-box"
            value={value} 
            placeholder="Enter command here!"
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }
import '../styles/main.css';
import { getHeader } from '../../mocked_data/mockedCSVFunc';
import { useState } from 'react';

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
  interface CSVTableViewProps {
    called_command : string;
    csvArray: string[][]
  }
  
  // Input boxes contain state. We want to make sure React is managing that state,
  // so we have a special component that wraps the input box.
  export function CSVTableView(props: CSVTableViewProps) {
    const [header] = useState(getHeader());

    function handleTable() : JSX.Element {
        return (<table >
            <tbody>
            {
                props.csvArray.map((row,index) => {
                    if (header && props.called_command === "view" && index===0) {
                        return <tr className='header'>{
                            row.map(value => {
                                return <td>{value}</td>
                            })    
                        }
                        </tr>
                    } else {
                        return <tr>{
                            row.map(value => {
                                return <td>{value}</td>
                            })    
                        }
                        </tr> 
                    }
                })
            }
            </tbody>
        </table>)
    }

    return (
      handleTable()
    );
  }


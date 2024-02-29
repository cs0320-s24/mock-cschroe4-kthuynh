import '../styles/main.css';
import { getHeader } from '../../mocked_data/mockedCSVFunc';
import { useState } from 'react';

/**
 * The properties of a CSV Table View componenent.
 */
interface CSVTableViewProps {
    called_command : string;
    csvArray: string[][]
}
  
/**
 * A function that returns a table representing the CSV.
 * @param props The properties of the table.
 * @returns A JSX Element for the table.
 */
export function CSVTableView(props: CSVTableViewProps) {
    // Whether or not the table should have a header.
    const [header] = useState(getHeader());

    /**
     * A method for handling the table's rendering.
     * @returns A JSX element for the formatted table.
     */
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

    /**
     * The return method for rending.
     */
    return (
        handleTable()
    );
}


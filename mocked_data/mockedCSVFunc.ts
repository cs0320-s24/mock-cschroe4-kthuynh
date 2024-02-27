import {getFileMap, getSearchMap} from './mockedJson'

let currentCSV : string = "";
const file_map : Map<string, string[][]> = getFileMap();
const search_map : Map<string,  Map<string, string[][]>> = getSearchMap();
let has_header : string;

// args[0] filepath, args[1] hasHeader
export function loadcsv(args: string[]) : string {
    if (args.length != 2) {
        return "ERROR: Missing required params for <load_file>: <file_path> <has_header>";
    } else {
        const csv: string = args[0];
        has_header = args[1];

        if (!file_map.has(csv)) {
            return "ERROR: CSV not found: " + csv;
        }

        if (has_header.toLowerCase() !== "true" && has_header.toLowerCase() !== "false") {
            has_header = "";
            return "ERROR: <has_header> must be in the form of true/false";
        }

        // Mocking what is returned when a CSV is unable to be parsed
        // due to malformation.
        if (csv.includes("Malformed")) {
            return "ERROR: CSV Malformed";
        }

        currentCSV = csv;
        return "Current CSV: " + csv;
    }
}

export function viewcsv() : string[][] | string{
    if (currentCSV && file_map.has(currentCSV)) {
        return file_map.get(currentCSV)!;
    } else {
        return "ERROR: CSV not loaded";
    }
}

//args: 0: keyword; 1: columnIdentifier
export function searchcsv(args: string[]) : string[][] | string {
    //todo check has header
    if (!currentCSV) {
        return "ERROR: CSV not loaded";
    }

    if (args.length != 1 && args.length != 2) {
        return "ERROR: Missing required params for <search>: <value> OPTIONAL:<column_identifier>";
    }

    const wordsToRowsMap = search_map.get(currentCSV);
    if(wordsToRowsMap){
        const query : string = (args[0].toLowerCase() + " " + (args[1] ? args[1].toLowerCase() : "")).trim();
        const rowsFound = wordsToRowsMap.get(query);
        if(rowsFound){
            return rowsFound;
        }
    }
    
    return "Keyword not found";
}

export function clearLoadedCSV() {
    currentCSV = "";
    has_header = "";
}
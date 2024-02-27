import {getFileMap, getSearchMap} from './mockedJson'

let currentCSV : string = "";
const file_map : Map<string, string[][]> = getFileMap();
const search_map : Map<string,  Map<string, string[][]>> = getSearchMap();

// args[0] filepath, args[1] hasHeader
export function loadcsv(args: string[]) : string {
    if (args.length != 2) {
        return "ERROR: Missing required params for <load_file>: <file_path> <has_header>";
    } else {
        const csv: string = args[0];
        const hasHeader: string = args[1];

        if (!file_map.has(csv)) {
            return "ERROR: CSV not found: " + csv;
        }

        if (hasHeader.toLowerCase() !== "true" && hasHeader.toLowerCase() !== "false") {
            return "ERROR: <has_header> must be in the form of true/false"
        }

        // Mocking what is returned when a CSV is unable to be parsed
        // due to malformation.
        if (csv.includes("Malformed")) {
            return "ERROR: CSV Malformed"
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
    if (!currentCSV) {
        return "ERROR: CSV not loaded";
    }

    if (args.length != 1 && args.length != 2) {
        return "ERROR: Missing required params for <search>: <value> OPTIONAL:<column_identifier>";
    }

    const wordsToRowsMap = search_map.get(currentCSV);
    if(wordsToRowsMap){
        const query : string = (args[0].toLowerCase() + " " + (args[1].toLowerCase() ? args[1].toLowerCase() : "")).trim();
        console.log(query);
        const rowsFound = wordsToRowsMap.get(query); //TODO add column identifier??
        if(rowsFound){
            return rowsFound;
        }
    }
    //todo error handle / throw error
    return "Keyword not found";
}

export function clearLoadedCSV() {
    currentCSV = "";
}
import {getFileMap, getSearchMap} from './mockedJson'

let currentCSV : string = "";
const file_map : Map<string, string[][]> = getFileMap();
const search_map : Map<string,  Map<string, string[][]>> = getSearchMap();
let has_header : string;

/**
 * Loads a csv file.
 * @param args The arguments it takes in, where args[0] is the file path, 
 * and args[1] is whether it has header.
 * @returns A string for the result of loading the file.
 */
export function loadcsv(args: string[]) : string {
    if (args.length != 2) {
        if(args.length > 2){
            return "ERROR: Too many params for <load_file>: <file_path> <has_header>";
        }
        return "ERROR: Missing required params for <load_file>: <file_path> <has_header>";
    } else {
        const csv: string = args[0];
        has_header = args[1];

        if (!csv.startsWith("data")) {
            return "ERROR: File must be in the protected 'data' directory"
        }

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

/**
 * Returns the current CSV.
 * @returns A 2D array of the CSV, or an error message if it was not loaded.
 */
export function viewcsv() : string[][] | string{
    if (currentCSV && file_map.has(currentCSV)) {
        return file_map.get(currentCSV)!;
    } else {
        return "ERROR: CSV not loaded";
    }
}

/**
 * Returns the search results of a CSV.
 * @param args The arguments, where args[0] is the key word, and args[1] is the column identifier.
 * @returns A 2D array of the results, or an error message.
 */
export function searchcsv(args: string[]) : string[][] | string {
    
    if (!currentCSV) {
        return "ERROR: CSV not loaded";
    }

    if (args.length < 1) {
        return "ERROR: Missing required params for <search>: <value> OPTIONAL:<column_identifier>";
    } else if(args.length > 2){
        return "ERROR: Too many params for <search>: <value> OPTIONAL:<column_identifier>";
    }


    if (args[1] && !getHasHeader()) {
        var reg = /^-?\d+\.?\d*$/;
        if (!reg.test(args[1])) {
            return "ERROR: CSV cannot be searched by header values, only column index";
        }
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

/**
 * Gets if the current CSV has a header.
 * @returns A boolean for if the CSV has a header.
 */
export function getHasHeader(): boolean {
    if (has_header.toLowerCase() === "true") {
        return true;
    } else {
        return false;
    }
}

/**
 * Clears information of the CSV after signing out.
 */
export function clearLoadedCSV() {
    currentCSV = "";
    has_header = "";
}
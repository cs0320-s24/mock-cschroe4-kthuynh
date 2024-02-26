import {getFileMap, getSearchMap} from './mockedJson'

let currentCSV : string = "";
const file_map : Map<string, string[][]> = getFileMap();
const search_map : Map<string,  Map<string, string[][]>> = getSearchMap();

// args[0] filepath, args[1] hasHeader
export function loadcsv(args: string[]) : string {
    const csv: string = args[0];
    currentCSV = csv;
    return "Current CSV: " + csv;
}

export function viewcsv() : string[][] {
    return file_map.get(currentCSV) || [];
}

//args: 0: keyword; 1: columnIdentifier
export function searchcsv(args: string[]) : string[][] {
    const wordsToRowsMap = search_map.get(currentCSV);
    if(wordsToRowsMap){
        const rowsFound = wordsToRowsMap.get(args[0].toLowerCase()); //TODO add column identifier??
        if(rowsFound){
            return rowsFound;
        }
    }
    //todo error handle / throw error
    return [["Keyword not found"]];
}
const file_map = new Map<string, string[][]>;
const search_map : Map<string, Map<string, string[][]>> = new Map<string, Map<string, string[][]>>;

/**
 * Helper method to add the mocked data to maps for mocked CSV functions
 * @param filepath : string to representing the filepath to map to
 * @param mockedCSV : mockedCSV data to map words for
 */
function addToMaps(filepath : string, mockedCSV : string[][]) {
    file_map.set(filepath, mockedCSV);
    const mockedCSVMap : Map<string, string[][]> = new Map<string,string[][]>;
    for(let i = 0; i < mockedCSV.length; i++){
        for(const element of mockedCSV[i]){
            const lowerCaseElement = element.toLowerCase(); //todo is there a cleaner way?
            const rowsList = mockedCSVMap.get(lowerCaseElement);
            if(rowsList){
                if(!rowsList.includes(mockedCSV[i])){
                    rowsList.push(mockedCSV[i])
                    mockedCSVMap.set(lowerCaseElement, rowsList);
                }
            } else {
                mockedCSVMap.set(lowerCaseElement, [mockedCSV[i]]);
            }
        }
    }
    search_map.set(filepath, mockedCSVMap);
}

const mockedCSV : string[][] = [
    ["Location", "Floors", "Occupants", "Bathrooms"],
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
addToMaps("data/mockedCSV", mockedCSV);


const mockedCSVNoHeader : string[][] = [
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
addToMaps("data/mockedCSVNoHeader", mockedCSVNoHeader);

const mockedCSVLargeNumbers: string[][] = [
    ["Location", "Floors", "Occupants", "Bathrooms", "Price"],
    ["Boston", "3", "6", "3", "2,000"],
    ["California", "1", "1", "1","1,500"]
]
addToMaps("data/mockedCSVLargeNumbers", mockedCSVLargeNumbers);

const mockedCSVSharedAcrossRows: string[][] = [
  ["Location", "Floors", "Occupants", "Bathrooms", "Price"],
  ["Boston", "3", "6", "3", "2,000"],
  ["California", "1", "1", "1", "1,500"],
  ["Boston", "1", "2", "4", "1,000"]
];
addToMaps("data/mockedCSVSharedAcrossRows", mockedCSVSharedAcrossRows);

const mockedSearch : string[][] = [
    ["California", "1", "1", "1"]
]

const mockedSearchMultipleRows: string[][] = [
    ["Boston", "3", "6", "3", "2,000"],
    ["Boston", "1", "2", "4", "1,000"]
]

//TODO should this be moved to its own file?
//backend tracking of current CSV
let currentCSV : string = "";


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
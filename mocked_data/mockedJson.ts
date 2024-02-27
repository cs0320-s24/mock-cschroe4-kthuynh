const file_map = new Map<string, string[][]>;
const search_map : Map<string, Map<string, string[][]>> = new Map<string, Map<string, string[][]>>;
//mocked searching map
//const search_map_num : Map<string, Map<number, Map<string,string[][]>>> = new Map<string, Map<string, string[][]>>;

/**
 * Helper method to add the mocked data to maps for mocked CSV functions
 * @param filepath : string to representing the filepath to map to
 * @param mockedCSV : mockedCSV data to map words for
 */
function addToMaps(filepath : string, mockedCSV : string[][]) {
    file_map.set(filepath, mockedCSV);
    const mockedCSVMap : Map<string, string[][]> = new Map<string,string[][]>;
    const mockedCSVMapNum : Map<number, Map<string, string[][]>> = new Map<number, Map<string,string[][]>>;
    for(let i = 0; i < mockedCSV.length; i++){
        for(let j = 0; j < mockedCSV[i].length; j++){
            //through each column
            const lowerCaseElement = mockedCSV[i][j].toLowerCase(); //todo is there a cleaner way?
            
            //gets the map of the current column index
            
            /*
            let columnMap;
            if (mockedCSVMapNum.has(j)) {
                columnMap = mockedCSVMapNum.get(j);
            } else {
                columnMap = new Map<string, string[][]>
                mockedCSVMapNum.set(j, columnMap);
            }

            //todo sho
            const rowsListIndexed = columnMap?.get(lowerCaseElement);
            if(rowsListIndexed){
                if(!rowsListIndexed.includes(mockedCSV[i])){
                    rowsListIndexed.push(mockedCSV[i])
                    columnMap.set(lowerCaseElement, rowsListIndexed);
                }
            } else {
                columnMap.set(lowerCaseElement, [mockedCSV[i]]);
            }
            
            //make the regular map without columns
            if(mockedCSVMap.has(lowerCaseElement)){
                const rowsList = mockedCSVMap.get(lowerCaseElement);
                if(!rowsList.includes(mockedCSV[i])){
                    rowsList.push(mockedCSV[i])
                    mockedCSVMap.set(lowerCaseElement, rowsList);
                }
            } else {
                mockedCSVMap.set(lowerCaseElement, [mockedCSV[i]]);
            }
            */
            
            // const rowsList = mockedCSVMap.get(lowerCaseElement);
            // if(rowsList){
                
            //     if(!rowsList.includes(mockedCSV[i])){
            //         rowsList.push(mockedCSV[i])
            //         mockedCSVMap.set(lowerCaseElement, rowsList);
            //     }
            // } else {
            //     mockedCSVMap.set(lowerCaseElement, [mockedCSV[i]]);
            // }
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

const mockedCSVMalformed: string[][] = [
    ["Location", "", "Occupants"],
    ["", "", ""]
]
addToMaps("data/mockedCSVMalformed", mockedCSVMalformed);

const mockedSearch : string[][] = [
    ["California", "1", "1", "1"]
]

const mockedSearchMultipleRows: string[][] = [
    ["Boston", "3", "6", "3", "2,000"],
    ["Boston", "1", "2", "4", "1,000"]
]

export function getFileMap() : Map<string, string[][]> {
    return new Map(file_map);
}

export function getSearchMap() : Map<string,  Map<string, string[][]>> {
    return new Map(search_map);
}
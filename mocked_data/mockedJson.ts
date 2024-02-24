const file_map = new Map<string, string[][]>;
const search_map : Map<string, Map<string, string[][]>> = new Map<string, Map<string, string[][]>>;

const mockedCSV : string[][] = [
    ["Location", "Floors", "Occupants", "Bathrooms"],
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
file_map.set("data/mockedCSV", mockedCSV);
const mockedCSVMap : Map<string, string[][]> = new Map<string,string[][]>;
for(let i = 0; i < mockedCSV.length; i++){
    for(const element of mockedCSV[i]){
        mockedCSVMap.get(element);
        mockedCSVMap.set(element, mockedCSVMap.get(element)?.push(mockedCSV[i]));
    }
}

const mockedCSVNoHeader : string[][] = [
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
file_map.set("data/mockedCSVNoHeader", mockedCSVNoHeader);

const mockedCSVLargeNumbers: string[][] = [
    ["Location", "Floors", "Occupants", "Bathrooms", "Price"],
    ["Boston", "3", "6", "3", "2,000"],
    ["California", "1", "1", "1","1,500"]
]
file_map.set("data/mockedCSVLargeNumbers", mockedCSVLargeNumbers)

const mockedCSVSharedAcrossRows: string[][] = [
  ["Location", "Floors", "Occupants", "Bathrooms", "Price"],
  ["Boston", "3", "6", "3", "2,000"],
  ["California", "1", "1", "1,500"],
  ["Boston", "1", "2", "4", "1,000"]
];
file_map.set("data/mockedCSVSharedAcrossRows", mockedCSVSharedAcrossRows)

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
  return []
}
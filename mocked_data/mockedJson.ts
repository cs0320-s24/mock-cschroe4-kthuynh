const file_map = new Map<string, string[][]>;
const search_map : Map<string, Map<string, string[][]>> = new Map<string, Map<string, string[][]>>;

const mockedCSV : string[][] = [
    ["Location", "Floors", "Occupants", "Bathrooms"],
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
file_map.set("data/mockedCSV", mockedCSV)
search_map.set("data/mockedCSV", new Map<string, string[][]>);
search_map.get("data/mockedCSV")?.set("boston location", [["Boston", "3", "6", "3"]]);
search_map.get("data/mockedCSV")?.set("california location", [["California", "1", "1", "1"]]);
search_map.get("data/mockedCSV")?.set("1 1", [["California", "1", "1", "1"]]);


const mockedCSVNoHeader : string[][] = [
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
file_map.set("data/mockedCSVNoHeader", mockedCSVNoHeader)
search_map.set("data/mockedCSVNoHeader", new Map<string, string[][]>);
search_map.get("data/mockedCSVNoHeader")?.set("boston 0", [["Boston", "3", "6", "3"]]);

const mockedCSVLargeNumbers: string[][] = [
    ["Location", "Floors", "Occupants", "Bathrooms", "Price"],
    ["Boston", "3", "6", "3", "2,000"],
    ["California", "1", "1", "1","1,500"]
]
file_map.set("data/mockedCSVLargeNumbers", mockedCSVLargeNumbers);
search_map.set("data/mockedCSVLargeNumbers", new Map<string, string[][]>);
search_map.get("data/mockedCSVLargeNumbers")?.set("2,000", [["Boston", "3", "6", "3", "2,000"]]);

const mockedCSVSharedAcrossRows: string[][] = [
  ["Location", "Floors", "Occupants", "Bathrooms", "Price"],
  ["Boston", "3", "6", "3", "2,000"],
  ["California", "1", "1", "1", "1,500"],
  ["Boston", "1", "2", "4", "1,000"]
];
file_map.set("data/mockedCSVSharedAcrossRows", mockedCSVSharedAcrossRows);
search_map.set("data/mockedCSVSharedAcrossRows", new Map<string, string[][]>);
search_map.get("data/mockedCSVSharedAcrossRows")?.set("1", [["California", "1", "1", "1", "1,500"],["Boston", "1", "2", "4", "1,000"]]);
search_map.get("data/mockedCSVSharedAcrossRows")?.set("1 occupants", [["California", "1", "1", "1", "1,500"]]);
search_map.get("data/mockedCSVSharedAcrossRows")?.set("california", [["California", "1", "1", "1", "1,500"]]);
search_map.get("data/mockedCSVSharedAcrossRows")?.set("california 1", [["California", "1", "1", "1", "1,500"]]);
search_map.get("data/mockedCSVSharedAcrossRows")?.set("boston location", [["Boston", "3", "6", "3", "2,000"], ["Boston", "1", "2", "4", "1,000"]]);
console.log(search_map.get("data/mockedCSVSharedAcrossRows"));

const mockedCSVMalformed: string[][] = [
    ["Location", "", "Occupants"],
    ["", "", ""]
]
file_map.set("data/mockedCSVMalformed", mockedCSVMalformed);

export function getFileMap() : Map<string, string[][]> {
    return new Map(file_map);
}

export function getSearchMap() : Map<string,  Map<string, string[][]>> {
    return new Map(search_map);
}
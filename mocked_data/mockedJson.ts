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

/**
 * Here's how we'll mock search. Let's do a map of file_names to a map of strings (our search parameters) to 2d arrays (our csv results).
 * In summary, Map<string, Map<string, string[][]>.
 * 
 * It would look something like this:
 * data/mockedCSV -> "3 bathrooms" -> ["Boston", "3", "6", "3"]
 * data/mockedCSVSharedAcrossRows -> "1 2" -> ["California", "1", "1", "1", "1,500"]
 * data/mockedCSVSharedAcrossRows -> "1" -> ["California", "1", "1", "1", "1,500"], ["Boston", "1", "2", "4", "1,000"]
 * 
 * It's up to your discretion which search parameters you include in the map. Just be diverse in what kind of queries you include.
 * If it's not in the map, just return "Invalid input!"
 */
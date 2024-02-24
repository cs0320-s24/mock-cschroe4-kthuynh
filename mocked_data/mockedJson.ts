const file_map = new Map<string, string[][]>;

const mockedCSV : string[][] = [
    ["Location", "Floors", "Occupants", "Bathrooms"],
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
file_map.set("data/mockedCSV", mockedCSV);

const mockedCSVNoHeader : string[][] = [
    ["Boston", "3", "6", "3"],
    ["California", "1", "1", "1"]
]
file_map.set("data/mockedCSVNoHeader", mockedCSVNoHeader);

const mockedSearch : string[][] = [
    ["California", "1", "1", "1"]
]

export function getCSV(file : string) : string[][] {
    return file_map.get(file) || [];
}

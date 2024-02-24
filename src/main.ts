
// Just an example function in a code module, so we can demo 

import { getCSV } from "../mocked_data/mockedJson";
import { CommandRegistry } from "./command_registry";

// testing arbitrary TypeScript functions outside React
export function zero() {
    return 0
}

export function initalizeCommands(registry : CommandRegistry) {
    registry.registerCommand("viewcsv", () => {return getCSV("data/mockedCSV")});
}
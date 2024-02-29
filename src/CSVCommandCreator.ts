import { loadcsv, viewcsv, searchcsv, getHeaderFormatting } from "../mocked_data/mockedCSVFunc";
import { CommandRegistry } from "./CommandRegistry";

export class CSVCommandCreator {
    registry : CommandRegistry;

    constructor(registry : CommandRegistry) {
        this.registry = registry;
    }

    initalizeCommands() {
        this.registry.registerCommand("view", () : string[][] | string => {return viewcsv()}, () : string => {return getHeaderFormatting()});
        this.registry.registerCommand("load_file", (args : string[]) : string => {return loadcsv(args);})
        this.registry.registerCommand("search", (args: string[]): string[][] | string => { return searchcsv(args); })
    }
}
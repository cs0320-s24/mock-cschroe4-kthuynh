import { loadcsv, viewcsv, searchcsv } from "../mocked_data/mockedCSVFunc";
import { CommandRegistry } from "./CommandRegistry";


//TODO should we make this a general interface for dependency injection?
//The developer could make a comand creator that just needs to have the initilizeComands functionallity
/*
interface command_creator_props {
    registry : CommandRegistry;
    currentCSV : string;
    setCurrentCSV : (curentCSV : string) => void;
}
*/

export class CSVCommandCreator {
    registry : CommandRegistry;

    constructor(registry : CommandRegistry) {
        this.registry = registry;
    }

    initalizeCommands() {
        this.registry.registerCommand("viewcsv", () : string[][] | string => {return viewcsv()});
        this.registry.registerCommand("loadcsv", (args : string[]) : string => {return loadcsv(args);})
        this.registry.registerCommand("searchcsv", (args: string[]): string[][] | string => { return searchcsv(args); })
    }
}
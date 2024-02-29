import { loadcsv, viewcsv, searchcsv} from "../mocked_data/mockedCSVFunc";
import { CommandRegistry } from "./CommandRegistry";

/**
 * A class to register CSV-related commands.
 */
export class CSVCommandCreator {
    /**
     * The registry being added to.
     */
    registry : CommandRegistry;

    /**
     * The constructor.
     * @param registry The registry being added to.
     */
    constructor(registry : CommandRegistry) {
        this.registry = registry;
    }

    /**
     * A method that initializes the commands.
     */
    initalizeCommands() {
        this.registry.registerCommand("view", () : string[][] | string => {return viewcsv()});
        this.registry.registerCommand("load_file", (args : string[]) : string => {return loadcsv(args);})
        this.registry.registerCommand("search", (args: string[]): string[][] | string => { return searchcsv(args); })
    }
}
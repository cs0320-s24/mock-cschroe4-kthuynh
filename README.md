# Project Details

- Project Name: Mock
- Total Estimated Time: 15 hours
- Team Member(s): kthuynh, cshroe4
- Repo Link: https://github.com/cs0320-s24/mock-cschroe4-kthuynh

# Design Choices

Our Mock is made up of the following components and files:

- App: The highest-level component, responsible for rendering the web application.
- LoginButton: The component responsible for logging the user into the web application.
- REPL: The component responsible for rendering the REPL as a whole.
- REPLHistory: The component responsible for rendering the command results for the REPL, including things like the results of viewing a CSV, searching a CSV, etc.
- REPLInput: The component responsible for rendering the inputting of commands.
- ControlledInput: The component that handles text input for the REPLInput.
- CSVTableView: The component responsible for handling the rendering of CSVs.
- MockedJSON: A file for containing the mocked CSVs necessary for checking the functionality of the front-end.
- MockedCSVFunc: A function library that mocks the functionality of the backend methods of the server.
- CommandRegistry: The registry of available commands for the REPL, which has a mpa of commands to their functions, and executes them for the REPL.
- CSVCommandCreator: Registers the commands related to CSV functionality.

# Errors/Bugs

N/A

# Tests

# How to

## Run Tests

## Run Mock

1. Begin by calling 'npm start' in the terminal of the Mock project, which starts the server.
2. Go to the corresponding website given in the terminal.
3. Press on the 'Log In' button to be able to enter commands.
4. The following commands are available. Press 'Submit' when ready to enter the command. When writing arguments, you can use "WORD1 WORD2" to denote a multi-worded argument.
   - load_file: This command loads a CSV file, which must be in the 'data' directory. USAGE: load_file <file_name> <has_header>
   - view: This command prints out the CSV file as a table. A CSV must be loaded to use this. USAGE: view
   - search: This command prints out the search results of a CSV given a keyword and optionally, a column identifier. USAGE: seach <keyword> OPTIONAL: <column_identifier>
   - mode: This command switches the REPL command output mode between either VERBOSE mode or BRIEF mode. USAGE: mode
5. Look at the text box in the middle to view your results.

# Collaboration

- Used to split arguments: https://stackoverflow.com/questions/16261635/javascript-split-string-by-space-but-ignore-space-in-quotes-notice-not-to-spli

import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({page})  => {

    // Step 1: Navigate to a URL
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Login').click();
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  await expect(page.getByRole('button')).toBeVisible;
});

async function submitCommand(command: string, page){
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill(command);
  await page.getByLabel('submit').click();
}

test('after I click the button, my command gets pushed', async ({ page }) => {
  await submitCommand("load_file data/mockedCSV true", page);
  
  await expect(page.getByLabel('repl-command')).toBeVisible();
  await expect(page.getByLabel('repl-command')).toHaveText('Current CSV: data/mockedCSV');

  await submitCommand("load_file data/mockedCSVNoHeader true", page);
  //await expect(page.getByLabel('repl-history')).toHaveText('Current CSV: data/mockedCSV');
  await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSV$/)).toBeVisible();
  await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSVNoHeader$/)).toBeVisible();
  
  await submitCommand("load_file data/mockedCSVSharedAcrossRows false", page);
  await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSV$/)).toBeVisible();
  await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSVNoHeader$/)).toBeVisible();
  await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSVSharedAcrossRows$/)).toBeVisible();
});

test('after I load a csv, the URL gets pushed', async ({ page }) => {
  //TODO this one is kidna similar to the one above so maybe take out. Its a bit simpler so maybe its helpful idk
    await submitCommand("load_file data/mockedCSV true", page);
    await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSV$/)).toBeVisible()

    await submitCommand("load_file data/mockedCSVNoHeader false", page);
    await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSVNoHeader$/)).toBeVisible()
});



test('after I enter mode, command shows verbose mode', async ({ page }) => {
  //test the mode functionality to view commands
  await submitCommand("load_file data/mockedCSV true", page);
  await expect(page.getByLabel('verbose-box')).not.toBeVisible();
  
  await submitCommand("mode", page);
  await expect(page.getByLabel('repl-command').getByText(/^Current mode is: VERBOSE$/)).toBeVisible();
  
  //check if any verbose-box is visible
  await expect(page.getByLabel('verbose-box').first()).toBeVisible();
  //check specific verbose-box
  await expect(page.getByLabel('verbose-box').getByText(/^load_file data\/mockedCSV true$/)).toBeVisible();

  await expect(page.getByLabel('verbose-box').getByRole("paragraph")).toContainText(
    ['Command',
    'load_file data/mockedCSV true',
    'Output', 
    'Current CSV: data/mockedCSV']);

    await expect(page.getByLabel('verbose-box').getByRole("paragraph")).toContainText(
    ['Command',
    'mode',
    'Output', 
    'Current mode is: VERBOSE']);

});

test('after I enter mode again, command does not show verbose mode', async ({ page }) => {
  //test the mode functionality to view commands
  await submitCommand("load_file data/mockedCSV true", page);
  await submitCommand("mode", page);
  await submitCommand("mode", page);
  await expect(page.getByLabel('repl-command').getByText(/^Current mode is: BRIEF$/)).toBeVisible();
  await expect(page.getByLabel('verbose-box')).not.toBeVisible();

  //check whole page text
  await expect(page.getByLabel('repl-history').getByRole("paragraph")).toContainText(
    [/^Current CSV: data\/mockedCSV$/,
    'Current mode is: VERBOSE',
    'Current mode is: BRIEF',]
    );

});

test('after I enter mode, past commands shows verbose mode too', async ({ page }) => {
  //test the mode functionality to view commands
  await submitCommand("load_file data/mockedCSV true", page);
  await submitCommand("mode", page);
  await submitCommand("mode", page);
  await submitCommand("load_file data/mockedCSVNoHeader false", page);
  await submitCommand("mode", page);

  await expect(page.getByLabel("verbose-box")).toContainText(
    [
      'Commandload_file data/mockedCSV trueOutputCurrent CSV: data/mockedCSV',
      'CommandmodeOutputCurrent mode is: VERBOSE',
      'CommandmodeOutputCurrent mode is: BRIEF',
      'Commandload_file data/mockedCSVNoHeader falseOutputCurrent CSV: data/mockedCSVNoHeader',
      'CommandmodeOutputCurrent mode is: VERBOSE'
    ]
  )

});

test('after I load the wrong csv, an error message shows', async ({ page }) => {
  await submitCommand("load_file data/NOTREAL true", page);
  
  await expect(page.getByLabel('repl-history')).not.toHaveText('Current CSV: data/NOTREAL');
  await expect(page.getByLabel('repl-history')).toHaveText('ERROR: CSV not found: data/NOTREAL');

  await submitCommand("load_file data/mockedCSV true", page);
  await expect(page.getByLabel('repl-history')).not.toHaveText('Current CSV: data/NOTREAL');
  await expect(page.getByLabel('repl-command').getByText(/^Current CSV: data\/mockedCSV$/)).toBeVisible();
});


test('after I view or search before load, an error message shows', async ({ page }) => {
  await submitCommand("view", page);
  await expect(page.getByLabel('repl-history')).toHaveText('ERROR: CSV not loaded');

  await submitCommand("search", page);
  //should now have two error messages
  await expect(page.getByLabel('repl-history')).toHaveText('ERROR: CSV not loadedERROR: CSV not loaded');

  await submitCommand("mode", page);
  //to see explicitly the associated commands with the errors
  await expect(page.getByLabel("verbose-box")).
  toContainText(
    [ 
      "CommandviewOutputERROR: CSV not loaded",
      "CommandsearchOutputERROR: CSV not loaded",
      "CommandmodeOutputCurrent mode is: VERBOSE"
    ]
  )

});

test('after I load two different CSVs. that csv changes', async ({ page }) => {
  
  await submitCommand("load_file data/mockedCSV true", page);
  await submitCommand("view", page);
  await expect(page.getByLabel('repl-history').getByRole("cell")).toContainText([
    "Location","Floors","Occupants","Bathrooms",
    "Boston","3","6","3",
    "California","1","1","1"
  ]);

  await submitCommand("load_file data/mockedCSVNoHeader true", page);
  await submitCommand("view", page);
  await expect(page.getByLabel('repl-history').getByRole("table").getByRole("cell")).toContainText([
    "Location","Floors","Occupants","Bathrooms",
    "Boston","3","6","3",
    "California","1","1","1",
    "Boston","3","6","3",
    "California","1","1","1"
  ]);
});

//ERROR: CSV not found: mockedCSV
test('after I load a CSV not in data directory or does not exist, error message or row return', async ({ page }) => {
  await submitCommand("load_file mockedCSV true", page);
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: File must be in the protected 'data' directory$/)).toBeVisible();

  await submitCommand("load_file data/blahblah true", page);
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: CSV not found: data\/blahblah$/)).toBeVisible();

});
test('after I search a CSV with column, error message or row return', async ({ page }) => {
  await submitCommand("load_file data/mockedCSVSharedAcrossRows true", page);
  //one row returned
  await submitCommand("search California 1", page);
  await expect(page.getByLabel('repl-history').getByRole("table").getByRole("cell")).toContainText([
    "California","1","1","1"
  ]);

  //two rows returned
  await submitCommand("search Boston Location", page);
  await expect(page.getByLabel('repl-history').getByRole("table").getByRole("cell")).toContainText([
    "Boston", "3", "6", "3", "2,000", 
    "Boston", "1", "2", "4", "1,000"
  ]);
});

test('after I search a CSV without column, error message or row return', async ({ page }) => {
  await submitCommand("load_file data/mockedCSVSharedAcrossRows true", page);
  //one row returned
  await submitCommand("search California 1", page);
  await expect(page.getByLabel('repl-history').getByRole("table").getByRole("cell")).toContainText([
    "California","1","1","1"
  ]);

  //two rows returned
  await submitCommand("search 1", page);
  await expect(page.getByLabel('repl-history').getByRole("table").getByRole("cell")).toContainText([
    "California", "1", "1", "1", "1,500",
    "Boston", "1", "2", "4", "1,000"
  ]);
});

test('while declaring a header in loadcsv, if not true or false should return error message', async ({ page }) => {
  await submitCommand("load_file data/mockedCSVNoHeader no", page);
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: <has_header> must be in the form of true\/false$/)).toBeVisible();
});

test('after I declare no header and search a CSV with string column identifier, error message', async ({ page }) => {
    await submitCommand("load_file data/mockedCSVNoHeader false", page);
    await submitCommand("search Boston Location", page);
    await expect(page.getByLabel('repl-command').getByText(/^ERROR: CSV cannot be searched by header values, only column index$/)).toBeVisible();
});

test('after I click log out, resets csv state and comand history', async ({ page }) => {
  await submitCommand("load_file data/mockedCSVNoHeader true", page);
  await submitCommand("view", page);
  await page.getByLabel('Sign Out').click();
  await page.getByLabel('Login').click();

  //no table should be visible anymore
  await expect(page.getByLabel('repl-history').getByRole("table")).not.toBeVisible();

  await submitCommand("view", page);
  //error message expected
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: CSV not loaded$/)).toBeVisible();
});

test('after I enter an empty command, I get an error message', async ({ page }) => {
  page.on('dialog', async(d) => {
    expect(d.type()).toContain("alert");
    //Invalid command. Check documentation for availible commands
    expect(d.message()).toContain("Invalid command. Check documentation for availible commands");
    await d.accept();
  })
  await submitCommand("",page);
});

test('after I enter a command that does not exist, I get an error message', async ({ page }) => {
  page.on('dialog', async(d) => {
    expect(d.type()).toContain("alert");
    //Invalid command. Check documentation for availible commands
    expect(d.message()).toContain("Invalid command. Check documentation for availible commands");
    await d.accept();
  })
  await submitCommand("not a command",page);
  //contains part of command
  await submitCommand("load data/mockedCSV true",page);
  await submitCommand("vie",page);
  await submitCommand("searc boston location",page);
  //contains full command but also more to it
  await submitCommand("load_file_csv data/mockedCSV true",page);
  await submitCommand("viewcsv",page);
  await submitCommand("searchcsv boston location",page);
});

test('after I enter a command that exists but wrong number of args, error message', async ({ page }) => {
  //too few args - load
  await submitCommand("load_file", page);
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: Missing required params for <load_file>: <file_path> <has_header>$/)).toBeVisible();

  //too many args - load
  await submitCommand("load_file data/mockedCSV true extra", page);
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: Too many params for <load_file>: <file_path> <has_header>$/)).toBeVisible();

  //correctly load csv to test search
  await submitCommand("load_file data/mockedCSV true", page);

  //too few args - search
  await submitCommand("search", page);
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: Missing required params for <search>: <value> OPTIONAL:<column_identifier>$/)).toBeVisible();

  //too many args - search
  await submitCommand("search 1 1 1", page);
  await expect(page.getByLabel('repl-command').getByText(/^ERROR: Too many params for <search>: <value> OPTIONAL:<column_identifier>$/)).toBeVisible();
});


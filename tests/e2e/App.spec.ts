import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
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
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

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
  // TODO WITH TA: Fill this in!
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  await expect(page.getByRole('button')).toBeVisible;
});


test('after I click the button, my command gets pushed', async ({ page }) => {
  // TODO: Fill this in to test your button push functionality!
});

test('after I enter mode, the history shows up', async ({ page }) => {
  //test the mode functionality to view commands

});

test('after I load a csv, the URL gets pushed', async ({ page }) => {

});

test('after I load the wrong csv, an error message shows', async ({ page }) => {

});

test('after I view or search before load, an error message shows', async ({ page }) => {

});

test('after I load two different CSVs. that csv changes', async ({ page }) => {

});

test('after I search a CSV (with or without column), error message or row return', async ({ page }) => {

});

test('while declaring a header in loadcsv, if not true or false should return error message', async ({ page }) => {

});

test('after I declare no header and search a CSV with string column identifier, error message', async ({ page }) => {

});

test('after I click log out, resets csv state and comand history', async ({ page }) => {
  
});

test('after I enter an empty command, I get an error message', async ({ page }) => {
  
});

test('after I enter a command that does not exist, I get an error message', async ({ page }) => {
  
});

test('after I enter a command that exists but wrong number of args, error message', async ({ page }) => {
  
});


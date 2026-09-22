import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

let browser;

// 1. Launch the browser once before all test suites execute
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false }); // Change to true if running in CI pipelines
});

// 2. Setup a completely fresh browser context and page before every single scenario runs
Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage(); // This attaches the page directly onto Cucumber's 'this' context!
});

// 3. Clean up and close down pages and contexts after a scenario ends
After(async function () {
  await this.page.close();
  await this.context.close();
});

// 4. Shut down the browser execution completely at the final stage
AfterAll(async function () {
  await browser.close();
});

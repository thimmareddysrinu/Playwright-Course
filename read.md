
# Run only @smoke tests

npx playwright test --grep "@smoke"

# Run tests tagged with @regression

npx playwright test -g "@regression"

# Run tests tagged with BOTH @smoke AND @regression

npx playwright test --grep "(?=.*@smoke)(?=.*@regression)"

# Run tests that have EITHER @smoke OR @sanity

npx playwright test --grep "@smoke|@sanity"

# Run all tests EXCEPT @api

npx playwright test --grep-invert "@api"



{
  "scripts": {
    "test:smoke": "playwright test --grep @smoke",
    "test:regression": "playwright test --grep @regression",
    "test:api": "playwright test --grep @api",
    "test:ui-only": "playwright test --grep-invert @api"
  }
}





To master Playwright with JavaScript and TypeScript, practicing on real-world test scenarios across specialized sandbox websites is the fastest way to build confidence.

🌐 Recommended Practice Websites
SauceDemo: E-commerce site for testing end-to-end user flows, login states, and cart management.

UI Testing Playground: Designed to test dynamic content, delayed elements, and shadow DOM.

The Internet (Herokuapp): Covers alerts, drag-and-drop, frames, file uploads, and basic auth.

DemoQA: Great for practicing complex forms, nested frames, dynamic tables, and web tables.

🧪 Practical Scenarios & Official Documentation
Testing Scenario	Target Practice Site	Playwright Doc Link
Authentication & E2E Checkout	SauceDemo	Authentication Docs
Dynamic Loading & Auto-Waiting	UI Testing Playground	Auto-Waiting Docs
iFrames & Nested Frames	The Internet	FrameLocator Docs
Dialogs, Alerts, & Prompts	The Internet	Dialog Docs
File Uploads & Downloads	The Internet / DemoQA	Downloads Docs
API Mocking & Interception	Any Demo Site	Network Docs
💻 Code Examples (TypeScript)

1. Authentication & Form Submission
   TypeScript
   import { test, expect } from '@playwright/test';

test('login and verify cart flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Fill inputs and click submit
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Assert URL change and visual elements
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
});
2. Handling iFrames & Dynamic Elements
TypeScript
import { test, expect } from '@playwright/test';

test('interact with elements inside iframe', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');

  // Locate the frame directly
  const frame = page.frameLocator('#mce_0_ifr');
  const editor = frame.locator('#tinymce');

  await editor.clear();
  await editor.fill('Testing Playwright frame support!');
  await expect(editor).toHaveText('Testing Playwright frame support!');
});
3. Network Interception / API Mocking
TypeScript
import { test, expect } from '@playwright/test';

test('mock API response', async ({ page }) => {
  // Intercept route and serve custom JSON
  await page.route('**/api/v1/fruits', async route => {
    const json = [{ name: 'Mocked Apple', id: 1 }];
    await route.fulfill({ json });
  });

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Mocked Apple')).toBeVisible();
});

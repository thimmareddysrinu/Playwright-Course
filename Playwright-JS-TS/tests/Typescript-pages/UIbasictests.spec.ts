import { test,expect} from '@playwright/test';

test(" @WEB UI basic test",async({page})=>{
    await page.goto("https://playwright.dev/");
    // await page.getByText("Playwright").highlight()
    // await page.getByRole("link",{name:"Get started"}).click();
    // await page.getAttribute("");
    // await page.getByAltText();
    // await page.getByPlaceholder("").fill("");
    // await page.getByTitle();
    // await page.getByTestId();
    // await page.getByLabel();
    

    await page.waitForTimeout(9000)

})
import { expect, test } from "@playwright/test";




test(" @WEB Browser context test",async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://playwright.dev/");

    console.log( await page.title());
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright")

})

// we put only() it will be only run the test case mention not all test cases in file 
// test.only("Page test",async({page})=>{
//     await page.waitForTimeout(9000);
//     await page.goto("https://platform.claude.com/login?returnTo=%2Fsettings%2Fkeys");
//     console.log(await page.title());
//     // await expect(page).toHaveTitle()


//})
test("Page test",async({page})=>{
    
    await page.goto("https://platform.claude.com/login?returnTo=%2Fsettings%2Fkeys");
    console.log(await page.title());
    // await expect(page).not.toHaveTitle("Sign In | Claude Platform") this give error

    await expect(page).toHaveTitle("Sign In | Claude Platform")


})
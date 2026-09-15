import {expect, test} from '@playwright/test';



test("Visual testing 1 and save the screenshots",async({page})=>{

//  for entire page screen shot 

   await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   await  page.screenshot({path:"Sccrenshoot/automationpractice1.png"})
// for particular locator screenshot

   await page.locator('#displayed-text').screenshot({path:"Sccrenshoot/automationpractice2.png"})
})




test.only("Visual comparsion of inital and present screen shot",async({page})=>{

//  for entire page screen shot inital screenshot and present screen shot comparsion 

    await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveScreenshot("automationpractice1.png");


})
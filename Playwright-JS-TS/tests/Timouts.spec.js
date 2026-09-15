import {test,expect} from '@playwright/test'




test(" Different timout setting",async({page})=>{
    // test -level
    const slowtimeout=expect.configure({timeout:9000})

    page.goto("https://www.google.com");

    // step-level

    await expect(page.locator("..hob1Ic span").textContent()).toBeChecked({timeout:9000});


    
    // global timeout means 
     // set setting in playwright.config.js file
})
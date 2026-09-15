import {test ,expect} from '@playwright/test'




test(" anthoer browser",async({page})=>{


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const browsering=page.locator("[href*='documents-request']");
    const [newpage]=await Promise.all(
        [
        page.waitForEvent('popup'),
        browsering.click(),
    
        ]
    );
    const text=await newpage.locator(".red").textContent();
    const arrsplit=text.split("@")

    const domain=arrsplit[1].split(" ")[0]
    const data=await page.locator("#username").fill(domain)
    console.log(await page.locator("#username").textContent())// this not showing anything in console
    console.log(await page.locator("#username").inputValue()) //it will show filled content in console 
  




})
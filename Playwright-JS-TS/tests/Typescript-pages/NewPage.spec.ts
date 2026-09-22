import {test,expect} from '@playwright/test'




test("@WEB register page",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register")
    const firstname=page.locator("input#firstName")
    const lastname=page.locator("input#lastName")
    const phonenumber=page.locator("input#userMobile")
    const email=page.locator("[type='email']")
    const password=page.locator("input#userPassword")
    const conpassword=page.locator("input#confirmPassword")
    const submitted=page.locator("[type='submit']")



    await firstname.fill("srinuvasreddy")
    await lastname.fill("srinuvasreddy")
    await phonenumber.fill("8374535882")
    await email.fill("srinuvasreddy@gmail.com")
    await password.fill("Srinu452@")
    await conpassword.fill("Srinu452@")
    await submitted.click()
})
test("@WEB login page",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    
    const email=page.locator("[type='email']")
    const password=page.locator("input#userPassword")

    const submitted=page.locator("[type='submit']")





    
    await email.fill("srinuvasreddy@gmail.com");
    await password.fill("Srinu452@");

    await submitted.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor({state:"visible"})

    const titles=await page.locator(".card-body b").allTextContents();
    console.log(titles)
    // await expect (titles).toBeVisible();
    // const getting=await titles.textContent()
    // console.log(getting)
})
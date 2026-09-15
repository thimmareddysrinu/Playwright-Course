import {test,expect} from  '@playwright/test'




test("@WEB  page login",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    //await page.locator(".radiotextsty").locator("[value='user']").highlight();
    await page.locator("select.form-control").selectOption("teach");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await page.locator("#terms").check();
    await page.pause();
    await page.locator("#signInBtn").click();


    const productdetails= await page.locator(".card-title").nth(0).textContent()
    const productdetail = await page.locator(".card-title").first().textContent()
    console.log(productdetails)
    console.log(productdetail)
    const proddetails=page.locator(".card-text")

    console.log(await proddetails.allTextContents())
    const alltitle=page.locator(".card-title")
    console.log(await alltitle.allTextContents())

    // await page.waitForTimeout(90000)

    // const erroralert=page.locator(".alert-danger");

    // await erroralert.waitFor({state:"visible"});
    // console.log(await erroralert.textContent());

    //console.log(await page.locator("[style*='block']").textContent())
    // console.log(await page.locator("[style*='display:block']").textContent()) // this gives error 
    // Correct method call
   // console.log(await page.locator("[style*='display:block']").textContent());
    // const errorshown = page.locator("[style*='block']")
    // console.log(await errorshown.textContent())

    // await expect(errorshown).toContainText("Incorrect username/password.");

 
    








})
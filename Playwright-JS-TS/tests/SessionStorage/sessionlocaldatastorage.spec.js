import {test,expect} from '@playwright/test'


let GlobalContext;
test.beforeAll("storage data in JSON FORMAT",async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator("#userEmail").fill("srinuvasreddy@gmail.com");
    await page.locator("#userPassword").fill("Srinu452@");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:"state.json"})
    GlobalContext=await browser.newContext({storageState:"state.json"})

})



test("@WEB order Booking flow",async()=>{
    const page=await GlobalContext.newPage()

    const productname="ADIDAS ORIGINAL"
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")
    const allproducts=await page.locator(".card-body");
    const productsCount=await allproducts.count();
    for(let i = 0; i < productsCount; i++) {

        const currentproduct=await allproducts.nth(i)
        const text =await currentproduct.locator("h5 b").textContent();
        if(text.trim() === productname){
            await currentproduct.locator("text=Add To Cart").click();
            break
        }
    }
    await page.locator("[routerlink*='cart']").click()

    await page.locator(".cart li").first().waitFor();


})
test(" @WEB test 2",async()=>{
    const page=await GlobalContext.newPage()

    const productname="ADIDAS ORIGINAL"
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders")
    
   


})
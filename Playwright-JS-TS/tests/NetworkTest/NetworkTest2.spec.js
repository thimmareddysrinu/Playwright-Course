import {test,expect} from '@playwright/test';




test("@API retrieve data order id ",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    
    const email=page.locator("[type='email']")
    const password=page.locator("input#userPassword")

    const submitted=page.locator("[type='submit']")





    
    await email.fill("srinuvasreddy@gmail.com");
    await password.fill("Srinu452@");

    await submitted.click();
    await page.waitForLoadState('networkidle');

    await page.locator("[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }));

    await page.locator("button:has-text('View')").first().click();
    
})






test("using abort to stop running  ",async({page})=>{
    page.route("**/*.{jpeg,png,jpg,css}",route=>route.abort())
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    
    const email=page.locator("#username")
    const password=page.locator("#password")

    const submitted=page.locator("[type='submit']")





    
    await email.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");

    await submitted.click();
    await page.waitForLoadState('networkidle');
    await page.pause()

    // await page.locator("[routerlink*='myorders']").click();
    // await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    //     route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }));

    // await page.locator("button:has-text('View')").first().click();
    // await page.pause();
})    
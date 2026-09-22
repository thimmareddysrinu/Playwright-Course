import {test as base ,request} from '@playwright/test'

import APIUTILLS from './APIutills'


const Loginpayload={userEmail: "srinuvasreddy12@gmail.com", userPassword: "Srinu452@"};
const orderpayload={orders: [{country: "Cuba", productOrderedId:"6960ea76c941646b7a8b3dd5"}]}






const Customs = base.extend({
    Logininto:async({browser},use)=>{

        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator("#userEmail").fill(Loginpayload.userEmail);
        await page.locator("#userPassword").fill(Loginpayload.userPassword);

        await page.locator("#login").click();
        await page.waitForLoadState('networkidle');

        await use(page);

        

    },
    CreateOrder:async({request},use)=>{


        
        

    // Inject built-in request or create custom context cleanly
    const apiutills = new APIUTILLS(request, Loginpayload);
    const response = await apiutills.createOrder(orderpayload);

    await use(response);



    }


})

export { Customs, expect } from '@playwright/test';
import {test as base ,request,expect, Page } from '@playwright/test'

import APIUTILLS from './APIutills'


export const Loginpayload:any={userEmail: "srinuvasreddy12@gmail.com", userPassword: "Srinu452@"};
export const orderpayload:any={orders: [{country: "Cuba", productOrderedId:"6960ea76c941646b7a8b3dd5"}]}




type MyFixtures = {
  Logininto: Page;
  CreateOrder: { token: string; OrderId: string };
};

export const Customs = base.extend<MyFixtures>({

    Logininto:async({page},use:any)=>{

     
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator("#userEmail").fill(Loginpayload.userEmail);
        await page.locator("#userPassword").fill(Loginpayload.userPassword);

        await page.locator("#login").click();
        await page.waitForLoadState('networkidle');

        await use(page);

        

    },
    CreateOrder:async({request},use)=>{


        
        

    
    const apiutills = new APIUTILLS(request, Loginpayload);
    const response = await apiutills.createOrder(orderpayload);

    await use(response);



    }


})


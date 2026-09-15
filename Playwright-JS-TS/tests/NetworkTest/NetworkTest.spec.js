import {test,expect,request} from '@playwright/test'


const Baselogin ='https://rahulshettyacademy.com/api/ecom/auth/login';
const BaseUser='https://rahulshettyacademy.com/client';
const emailid='thimmareddy452@gmail.com';
const password='Srinu452@';
let token;
const Loginpayload={userEmail: "srinuvasreddy12@gmail.com", userPassword: "Srinu452@"}
const orderpayload={orders: [{country: "Cuba", productOrderedId:"6960ea76c941646b7a8b3dd5"}]}

import APIUTILLS from '../Utills/APIutills';

let fakebody={body:{},message:"No Orders"}

let response;
test.beforeAll(async()=>{

    const ApiContext=await request.newContext({
        extraHTTPHeaders:{
            "Content-Type": "application/json",
            'accept':'application/json'
        },
        
    });
    const apiutills=new APIUTILLS(ApiContext,Loginpayload);
    response=await apiutills.createOrder(orderpayload);





})




test("@API fill Assignment flow",async({page})=>{

    console.log(`tokenin network file:${response.token}`)
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },response.token)
    
    await page.goto(`${BaseUser}`)

    await page.route('**/api/ecom/order/get-orders-for-customer/**', async (route) => {
    const responses = await request.fetch(route.request());
    const body = JSON.stringify(fakebody);

    await route.fulfill({
    responses,
    body,
    contentType: 'application/json'
    });


    })
    await page.locator("[routerlink*='myorders']").click();

    
    const original=" You have No Orders to show at this time. Please Visit Back Us "

    // await expect(page.locator(".mt-4 ")).toContainText(original);

    // const history=page.locator("tbody tr");
    // await history.first().waitFor();
    // const historycount=await page.locator("tbody tr").count();
    // let OrderFound=false;
    // for(let i=0;i<historycount;++i){
    //     const getting=await history.nth(i).locator('th').textContent();
    //     if(getting && getting.trim().includes(response.OrderId)){
    //         OrderFound=true;
    //         console.log(`Order id:${response.OrderId} is found in the history table`)
    //         break;
    //     }
    // }
    // console.log(`Order id:${response.OrderId}is found in the history table`)
    // expect(OrderFound).toBeTruthy();






})
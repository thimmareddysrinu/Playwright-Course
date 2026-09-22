import {test,expect,request} from '@playwright/test'


const Baselogin ='https://rahulshettyacademy.com/api/ecom/auth/login';
const BaseUser='https://rahulshettyacademy.com/client/#/dashboard/dash';
const emailid='thimmareddy452@gmail.com';
const password='Srinu452@';
let token;
const Loginpayload={userEmail: "srinuvasreddy@gmail.com", userPassword: "Srinu452@"}
const orderpayload={orders: [{country: "Cuba", productOrderedId:"6960ea76c941646b7a8b3dd5"}]}

let OrderId;
test.beforeAll(async()=>{

    const ApiContext=await request.newContext({
        extraHTTPHeaders:{
            "Content-Type": "application/json",
            'accept':'application/json'
        },
        
    });
    const LoginResponse=await ApiContext.post(`${Baselogin}`,{data:Loginpayload})

    console.log(`login api response status code:${LoginResponse.status()}`)
    //expect(LoginResponse.ok()).toBeTruthy();
    const LoginResponseBody=await LoginResponse.json();
    token=LoginResponseBody.token;
    console.log(`Token: ${token}`);

    // order creation with Api

    const Responseordercreate=await ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderpayload,
        headers:{
            "Authorization":token,
            "Content-Type":"application/json",
        }
    })
    const responseJSON=await Responseordercreate.json();
    console.log(`Order creation response:${JSON.stringify(responseJSON)}`)
    OrderId=responseJSON.orders[0];


})


// async function login(page){
    
//     await page.goto(`${BaseUser}/login`)

//     await page.getByPlaceholder("you@email.com").fill(emailid)
//     await page.getByLabel("Password").fill(password)
//     page.locator("#login-btn").click()

//     await expect(page.getByRole("link",{name:"Browse Events →"})).toBeVisible();
// }

test(" @API fill Assignment flow",async({page})=>{
    // step 1: Login is Done
    // await login(page);
  

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token)
    console.log(`${token}`)
    await page.goto(`${BaseUser}`)

    // const productName="ZARA COAT 3"

    // const products=page.locator('.card-body');
    // const productCount=await products.count();
    
    // console.log(`${productCount}`)

    // for(let i=0;i<productCount;++i){
    //     if (await products.nth(i).locator('b').textContent()===productName) {

    //         await products.nth(i).locator("text=Add To Cart").click()
    //     }

    // }

    // await page.locator("[routerlink*='cart']").click();
    // await expect(page.locator(".infoWrap h3").textContent()).toContain(productName);
    await page.locator("[routerlink*='myorders']").click();
   //await page.locator("tobody").waitFor();
    const history=page.locator("tbody tr");
    await history.first().waitFor();
    const historycount=await page.locator("tbody tr").count();
    let OrderFound=false;
    for(let i=0;i<historycount;++i){
        const getting=await history.nth(i).locator('th').textContent();
        if(getting && getting.trim().includes(OrderId)){
            OrderFound=true;
            break;
        }
    }
    expect(OrderFound).toBeTruthy();






})
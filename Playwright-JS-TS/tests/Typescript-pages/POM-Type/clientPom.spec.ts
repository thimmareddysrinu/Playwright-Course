import {test,expect} from '@playwright/test';
import {LoginPage} from './pageobject'

import {OrderCreate} from './pageobject-Productordercreate'
test("order item flow",async({page})=>{


    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // const email=page.locator("[type='email']")
    // const password=page.locator("input#userPassword")

    // const submitted=page.locator("[type='submit']")





    
    // await email.fill("srinuvasreddy@gmail.com");
    // await password.fill("Srinu452@");

    // await submitted.click();

    const username="srinuvasreddy@gmail.com";
    const password="Srinu452@"
    const texts=page.locator(".card-body");
    const productName='ZARA COAT 3'
    const Loginpage=new LoginPage(page)
    await Loginpage.goTo()
    await Loginpage.ValidateLogin(username,password)
    const createOrderFlow=new OrderCreate(page)
    await createOrderFlow.searchproduct(productName)
    await createOrderFlow.goToCart()

    
    // await texts.first().waitFor(); 
    // const counting=await texts.count()

    // for (let i = 0; i < counting; ++i) {
    //     if (await texts.nth(i).locator("b").textContent() ===productName ) {
    //     await texts.nth(i).locator("text= Add To Cart").click();
    //     }
        
    // }
    // await page.locator("button[routerlink='/dashboard/cart']").click();
    // const itemincart= page.locator(".cartSection h3");
    // await expect(itemincart).toHaveText(productName);
    await createOrderFlow.validateproductinCart(productName)




    await page.locator(".subtotal").locator("[type='button']").click()
    const creditcardPay=page.locator(".field input");
    await creditcardPay.nth(0).clear();
    await creditcardPay.nth(0).fill("12345678934567890");
    await creditcardPay.nth(1).fill("333")
    await creditcardPay.nth(2).fill("Thimmareddysrinivas")
    
   
    const expiarydateMonth=page.locator(".field select").nth(0)
    const expiarydatedate=page.locator(".field select").nth(1)

    await expiarydateMonth.selectOption("01")
    await expiarydatedate.selectOption("16")
    await creditcardPay.nth(3).fill("ASR123")  
    

    const textchecker=await page.locator(".user__name label").textContent();

    expect(textchecker).toContain("srinuvasreddy@gmail.com");
    
    const countryname=page.locator("[placeholder='Select Country']");

    await countryname.pressSequentially("india",{delay:100})
    const dropdownResult =page.locator(".ta-results");
    await dropdownResult.waitFor();
    await dropdownResult.locator("button:has-text('India')").nth(1).click();
    //console.log(await texts.nth(0).textContent())
    await page.locator("[type='submit']").click()
    await page.locator(".action__submit ").click()

    await page.locator(".btn-primary").click();

    const orderIdgetting=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   
    const orderId = orderIdgetting?.replace(/\|/g, "").trim(); 
  

    await page.locator("label[routerlink='/dashboard/myorders']").click();

    const Orderhistry=await page.locator(" th[scope='row']").nth(0).textContent();
  

    expect(Orderhistry?.trim()).toContain(orderId);
    
    await page.pause()



})
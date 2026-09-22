import {test,expect} from '@playwright/test'
import {AllFlowCreateOrder} from './Manage'



test("Start to end order creation and cheking flow",async({page})=>{
    const username="srinivasreddy@gmail.com"
    const password="Srinu452@"
    const productName="ADIDAS ORIGINAL"


    const paging= new AllFlowCreateOrder(page)
    await paging.goto()
    await paging.validatedLogin(username,password)
    await paging.createorder(productName)
    await paging.gotoCart()
    await paging.checkOrder(productName)




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
import { expect, type Page ,type Locator} from '@playwright/test'




export class AllFlowCreateOrder {
    page: Page
    username: Locator
    password: Locator
    signinButton: Locator
    product: Locator
    productText: Locator
    cart: Locator
    loadingPage: Locator
    itemincart: Locator


    constructor(page: Page) {
        this.page = page
        this.signinButton = page.locator("[type='submit']")
        this.username = page.locator("[type='email']")
        this.password = page.locator("input#userPassword")
        this.product = page.locator('.card-body');
        this.productText = page.locator(".card-body b")
        this.cart = page.locator("[routerlink*='cart']")
        this.loadingPage = page.locator("cartWrap")
        this.itemincart = page.locator(".cartSection h3");



    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client")

    }
    async validatedLogin(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.signinButton.click()

    }
    async createorder(productName:string) {
        await this.product.first().waitFor()

        const productcount=await this.product.count()


        for (let i = 0; i < productcount; i++) {
            if (await this.product.nth(i).locator("b").textContent()=== productName) {
                await this.product.nth(i).locator("text= Add To Cart").click();
            }
            
        }


    }

    async gotoCart(){
        await this.cart.click()
    }
    async checkOrder(productName:string){
          const itemin=  this.itemincart;
          await expect(itemin).toHaveText(productName);
    } 

}


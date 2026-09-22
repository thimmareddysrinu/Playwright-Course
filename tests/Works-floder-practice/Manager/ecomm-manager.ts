import { Locator, Page } from "@playwright/test";


export class Login {
    username: Locator
    password: Locator
    submitbutton: Locator
    page:Page
    constructor(page: Page) {
        this.page = page
        this.username = page.locator("[type='email']")
        this.password = page.locator("[type='email']")
        this.submitbutton = page.locator("input#userPassword")

    }


    async loginvalidate(username:string,password:string){

        await this.username.fill(username)
        await this.password.fill(password)
        await this.submitbutton.click()

    }
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");

    }
}

export class orderCreate {
    product: Locator
    productText: Locator
    cart: Locator
    page:Page
    loadingPage:Locator
    itemincart:Locator
    constructor(page: Page) {
       this.page=page
       this.product=page.locator('.card-body');
       this.productText=page.locator(".card-body b")
       this.cart=page.locator("[routerlink*='cart']")
       this.loadingPage=page.locator("cartWrap")
       this.itemincart= page.locator(".cartSection h3");

    }


    async searchProduct (productName:string){
        await this.product.first().waitFor()
        const productscount=await this.product.count()

        for (let i = 0; i < productscount; i++) {

            if (this.product) {
                
            }
            
            
        }


        
    }
   
}
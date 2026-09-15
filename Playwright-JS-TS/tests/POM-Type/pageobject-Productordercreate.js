const { expect } = require('@playwright/test');

class OrderCreate{
    constructor(page){
       this.page=page
       this.product=page.locator('.card-body');
       this.productText=page.locator(".card-body b")
       this.cart=page.locator("[routerlink*='cart']")
       this.loadingPage=page.locator("cartWrap")
       this.itemincart= page.locator(".cartSection h3");
    }

    
    async searchproduct(productName){
        await this.product.first().waitFor();
        const texts=await this.productText.allTextContents()
        const counting=await this.product.count()
        

    for (let i = 0; i < counting; ++i) {
        if (await this.product.nth(i).locator("b").textContent() ===productName ) {
        await this.product.nth(i).locator("text= Add To Cart").click();
        this.page.pause()
        }
        
    }



    }
    async goToCart(){
        await this.cart.click()

    }

    async validateproductinCart(productName){
        const itemin= await this.itemincart;
    await expect(itemin).toHaveText(productName);
    }
}
module.exports={OrderCreate}
import {expect} from '@playwright/test'

export default class APIUTILLS {
    constructor(ApiContext,Loginpayload) {
    this.ApiContext=ApiContext;
    this.Loginpayload=Loginpayload

    }
    async getToken() {
        const Baselogin ='https://rahulshettyacademy.com/api/ecom/auth/login';
        const LoginResponse = await this.ApiContext.post(`${Baselogin}`, { data: this.Loginpayload })

        console.log(`login api response status code:${LoginResponse.status()}`)
        expect(LoginResponse.ok()).toBeTruthy();
        const LoginResponseBody = await LoginResponse.json();
        const token = await LoginResponseBody.token;
        console.log(`Token: ${token}`);
        return token

    }
    async createOrder(orderpayload) {
        
        const  responsetoken=await this.getToken();

        const Responseordercreate=await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderpayload,
        headers:{
            "Authorization":responsetoken,
            "Content-Type":"application/json",
        }
    })
    console.log(Responseordercreate.status())
    //expect(Responseordercreate.ok()).toBeTruthy();
    const responseJSON=await Responseordercreate.json();
    console.log(`Order creation response:${JSON.stringify(responseJSON)}`)
    const OrderId=responseJSON.orders[0];

    
    return {
        token: responsetoken,
        OrderId:OrderId

    };

    }
}


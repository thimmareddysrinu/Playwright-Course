class LoginPage{
    constructor(page){

        this.signinButton=page.locator("[type='submit']")
        this.username=page.locator("[type='email']")
        this.password=page.locator("input#userPassword")
        this.page=page
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");

    }
    async ValidateLogin(username,password){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.signinButton.click()


    }
}
module.exports={LoginPage}
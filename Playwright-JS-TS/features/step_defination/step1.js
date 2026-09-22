import {Given,When,Then} from '@cucumber/cucumber'
import {AllFlowCreateOrder} from '../../CUCUMBER-FLOW/Manage.ts'

Given('Ecommerce to login with {string} and {string}', async function (usernames, passwords) {
  // Write code here that turns the phrase above into concrete actions
     const username="srinuvasreddy123@gmail.com"
    const password="Srinu452@"
    this.productName="ADIDAS ORIGINAL"


    this.paging= new AllFlowCreateOrder(this.page)
    await this.paging.goto()
    await this.paging.validatedLogin(username,password)
 
});

When('add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  await this.paging.createorder(productName)
});

Then('Verify {string} is in the Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  await this.paging.gotoCart()
    await this.paging.checkOrder(productName)
});

// When('enter valid details to Place The Order', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('Check or verify Order is in the OrderHistory', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });
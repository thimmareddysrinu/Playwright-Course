const { test: base } = require("@playwright/test");
exports.custombase = base.test.extend({
    testDataForOrder: {
    username: "srinuvasreddy12@gmail.com",
    password: "Srinu452@",
    productName: "iphone 13 pro"
    }
})
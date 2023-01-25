const puppeteer = require('puppeteer');
const login_url = "https://www.webstaurantstore.com/myaccount";
const cart_url = "https://www.webstaurantstore.com/cart/";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


async function givePage() {
    //setting headless to true hides the browser, false pulls up the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log('arrived on page');
    return page;
}

async function loginPage(page, data) {
    await page.goto(login_url);
    await page.waitForSelector("input[class='form__control']");
    await page.type("input[id='email']", data.email);
    await page.type("input[id='password']", data.password);
    await page.click("input[class='btn btn-primary btn-block']");
}

async function addToCart(page, products) {
    for (let i = 0; i < products.length; i++) {
        await page.goto(products[i]);
        await page.waitForSelector("input[class='btn btn-cart btn-large']");
        await page.click("input[class='btn btn-cart btn-large']", elem => elem.click());
        console.log("added to cart");
        await delay(500);
    }
}

async function goToCart(page) {
    await page.goto(cart_url);
}

//Call the checkout function when form is submitted
async function checkout(data, signal) {
    var page = await givePage();
    await loginPage(page, data);
    await delay(1000); /// waiting 1 second.
    await addToCart(page, data);
    await delay(1000);
    await goToCart(page);
    console.log("in cart");
}
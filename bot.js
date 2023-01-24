const puppeteer = require('puppeteer');

let product_url = "https://www.webstaurantstore.com/monin-750-ml-premium-caramel-flavoring-syrup/544SYPAR009A.html";


async function givePage() {
    //setting headless to true hides the browser, false pulls up the browser
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    console.log('arrived on page');
    return page;
}

async function addToCart(page) {
    await page.goto(product_url);
    await page.waitForSelector("input[class='btn btn-cart btn-large']");
    await page.click("input[class='btn btn-cart btn-large']", elem => elem.click());
    console.log("added to cart");
    await page.waitForSelector("button[class='btn btn-primary']");
    await page.goto(`https://www.webstaurantstore.com/cart/`)
}

async function checkout() {
    var page = await givePage();
    await addToCart(page);
}

checkout();
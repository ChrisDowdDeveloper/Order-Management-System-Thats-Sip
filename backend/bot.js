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

async function loginPage(page, form) {
    await page.goto(login_url);
    await page.waitForSelector("input[class='form__control']");
    await page.type("input[id='email']", form.email);
    await page.type("input[id='password']", form.password);
    await page.click("input[class='btn btn-primary btn-block']");
}

async function addToCart(page, temp) {
    console.log(temp)
    for (let i = 0; i < temp.length; i++) {
        const url = temp[i];
        console.log(url)
        if (!url) {
            console.error(`URL at position ${i} is undefined or null.`);
            continue;
        }
        if (typeof url !== 'string' || !url.startsWith('http')) {
            console.error(`URL at position ${i} is not a valid URL: ${url}`);
            continue;
        }
      try {
        await page.goto(temp[i]);
        const isUnavailable = await page.$("div[id='unavailableContainer']");
        if (isUnavailable) {
          console.log("Item unavailable, skipping...");
          continue; // Skip to the next iteration
        }
  
        const addButton = await page.$("input[class='btn btn-cart btn-large']");
        if (addButton) {
          await page.click("input[class='btn btn-cart btn-large']");
          console.log("added to cart");
          await delay(700);
        } else {
          console.log("Add button not found, skipping...");
        }
      } catch (error) {
        console.log(`An error occurred while processing item ${i}: ${error.message}`);
      }
    }
  }

//Call the checkout function when form is submitted
async function checkout(form, temp) {
    var page = await givePage();
    await loginPage(page, form);
    await delay(1000); /// waiting 1 second.
    await addToCart(page, temp)
    await delay(1000);
}

module.exports = checkout
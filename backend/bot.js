const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const login_url = "https://www.webstaurantstore.com/myaccount";
const cart_url = "https://www.webstaurantstore.com/cart/";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function givePage() {
    let driver = await new Builder().forBrowser('chrome').build();
    return driver;
}

async function loginPage(driver, form) {
    await driver.get(login_url);
    await driver.findElement(By.id('email')).sendKeys(form.email);
    await driver.findElement(By.id('password')).sendKeys(form.password, Key.RETURN);
    await delay(3000);
}

async function addToCart(driver, temp) {
    for (let i = 0; i < temp.length; i++) {
        const url = temp[i];
        if (!url) {
            console.error(`URL at position ${i} is undefined or null.`);
            continue;
        }
        if (typeof url !== 'string' || !url.startsWith('http')) {
            console.error(`URL at position ${i} is not a valid URL: ${url}`);
            continue;
        }
        try {
            await driver.get(url);
            const isUnavailable = await driver.findElement(By.id('unavailableContainer')).catch(() => null);
            if (isUnavailable) {
                console.log('Item unavailable, skipping...');
                continue;
            }
            const addButton = await driver.findElement(By.css("input[class='btn btn-cart btn-large']")).catch(() => null);
            if (addButton) {
                await addButton.click();
                console.log('Added to cart');
                await delay(700);
            } else {
                console.log('Add button not found, skipping...');
            }
        } catch (err) {
            console.log(`An error occurred while processing item ${i}: ${err.message}`);
        }
    }
}

async function checkout(form, temp) {
    const driver = await givePage();
    await loginPage(driver, form);
    await delay(1000);
    await addToCart(driver, temp);
    await delay(1000);
    await driver.quit();
}

module.exports = checkout;

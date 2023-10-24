const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const login_url = "https://www.webstaurantstore.com/myaccount";
const cart_url = "https://www.webstaurantstore.com/cart/";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Initializes a Selenium WebDriver
async function givePage() {
    let driver = await new Builder().forBrowser('chrome').build();
    return driver;
}

// Takes the WebDriver and the login information as inputs
async function loginPage(driver, form) {
    
    // Navigates to the login page and enters in the information that is provided and waits 3 seconds
    await driver.get(login_url);
    await driver.findElement(By.id('email')).sendKeys(form.email);
    await driver.findElement(By.id('password')).sendKeys(form.password, Key.RETURN);
    await delay(3000);
}

// Takes the WebDriver and the order being placed as inputs
async function addToCart(driver, order) {

    // Loops through the array of the orders and verifies that the orders have valid urls
    for (let i = 0; i < order.length; i++) {
        const url = order[i];
        if (!url) {
            console.error(`URL at position ${i} is undefined or null.`);
            continue;
        }
        if (typeof url !== 'string' || !url.startsWith('http')) {
            console.error(`URL at position ${i} is not a valid URL: ${url}`);
            continue;
        }

        // Navigates to each URL and verifies if the item can be ordered, if so, it adds to cart. If not, skips to the next item
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






async function checkout(form, order) {
    // Calls the givePage() function to get the WebDriver
    const driver = await givePage();

    // Calls the loginPage() function providing the form and WebDriver as arguments
    await loginPage(driver, form);

    // Waits 1 second
    await delay(1000);

    // Calls the addToCart() function providing the WebDriver and the order as arguments
    await addToCart(driver, order);

    // Waits 1 second
    await delay(1000);

    // WebDriver stops
    await driver.quit();
}

module.exports = checkout;

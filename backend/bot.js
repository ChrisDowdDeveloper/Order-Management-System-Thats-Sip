const { Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function createDriver() {
    if (!driver) {
        let builder = new Builder().forBrowser('chrome');
        let chromeOptions = new chrome.Options();
        driver = await builder.setChromeOptions(chromeOptions).build();
    }
    return driver;
}

async function closeDriver() {
    if(driver) {
        await driver.quit();
        driver = null;
    }
}

// Takes the WebDriver and the login information as inputs
async function loginYourBrand(driver) {
    
    // Navigates to the login page and enters in the information that is provided and waits 3 seconds
    await driver.get("https://www.yourbrandcafe.com/my-account/");
    const usernameYourBrand = process.env.YOURBRAND_EMAIL;
    const passwordYourBrand = process.env.YOURBRAND_PASSWORD;
    await driver.wait(until.elementLocated(By.id('email')), 10000);
    await driver.findElement(By.id('email')).sendKeys("jennifer");
    await driver.wait(until.elementLocated(By.id('password')), 10000);
    await driver.findElement(By.id('password')).sendKeys("lunsford", Key.RETURN);
    await delay(3000);
}

async function loginWebstaurant(driver) {
    const usernameWebstaurant = process.env.WEBSTAURANT_EMAIL;
    const passwordWebstaurant = process.env.WEBSTAURANT_PASSWORD;

    await driver.get("https://www.webstaurantstore.com/myaccount");

    const emailField = await driver.wait(until.elementLocated(By.id('email')), 10000);
    await emailField.sendKeys(usernameWebstaurant);

    const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
    await passwordField.sendKeys(passwordWebstaurant, Key.RETURN);

    await delay(3000);
}

async function yourBrandLogic(yourBrandUrls, driver) {
    try {
        for(let j = 0; j < yourBrandUrls.length; j++) {
            let current = yourBrandUrls[j];
            if(current.includes("https://www.yourbrandcafe.com/products/flat-lids") || url.includes("https://www.yourbrandcafe.com/products/eco")) {
                try {
                    driver.get(current);
                    let addButton = driver.findElement(By.className("single_add_to_cart_button"));
                    addButton.click();
                } catch(error) {
                    console.error(error);
                }
            } else {
                // Handle other products with additional attributes before adding to cart.
                try {
                    // The following block repeats the steps of navigating to the URL,
                    // finding elements by name or XPath, clicking them, and waiting as necessary.
                    driver.get(url);
                    let printOpt = driver.findElement(By.name("tm_attribute_pa_print-type_1"));
                    printOpt.click();
                    await delay(2000); // Wait for 2 seconds to allow for page update.
                    let  printLoc = driver.findElement(By.name("tmcp_radio_0"));
                    printLoc.click();
                    await delay(2000);
                    let artwork = driver.findElement(By.xpath("(//input[@name='tmcp_radio_5'])[2]"));
                    artwork.click();
                    await delay(2000);
                    let verify = driver.findElement(By.name("tmcp_checkbox_9_0"));                        verify.click();
                    await delay(2000);
                    let addButton = driver.findElement(By.className("single_add_to_cart_button"));
                    addButton.click(); // Click the add-to-cart button.
                    await delay(2000); // Wait for 2 seconds after adding to cart.
                } catch(error) {
                    console.error(error); // Print the exception if an element is not found.
                }
            }
        }
    } catch(e) {
        console.error(e);
    }
}

async function webstaurantLogic(webstaurantUrls, driver) {
    try {
        for(let k = 0; k < webstaurantUrls.length; k++) {
            let currentWeb = webstaurantUrls[k];
            try {
                driver.get(currentWeb);
                try {
                    let addButton = driver.findElement(By.id("buyButton"));
                    if (addButton != null) {
                        addButton.click(); // Click the add-to-cart button if found.
                        await delay(3000); // Wait for 3 second after adding.
                    } else {
                        // Handle cases where the product is unavailable.
                        let isUnavailable = driver.findElement(By.id("unavailableContainer"));
                        if (isUnavailable != null) {
                            console.log("item unavailable: " + currentWeb);
                            continue; // Skip adding this item and continue with the next.
                        }
                    }
                } catch(error) {
                    console.error(error);
                }
            } catch(error) {
                console.error(error);
            }
        }
    } catch (error) {
        
    }
}


async function addToCart(driver, order) {
    let yourBrandUrls = [];
    let webstaurantUrls = [];
    for(let i = 0; i < order.length; i++) {
        const url = order[i];
        if(!url) {
            console.error(`URL at position ${i} is undefined or null.`);
            continue;
        }
        if(typeof url !== 'string' || !url.startsWith('http')) {
            console.error(`URL at position ${i} is not a valid url`);
        }
        if(url.includes("https://www.yourbrandcafe.com")) yourBrandUrls.push(url)
        if(url.includes("https://www.webstaurantstore.com")) webstaurantUrls.push(url);
    }
    if(webstaurantUrls.length > 0) {
        await loginWebstaurant(driver)
        await webstaurantLogic(webstaurantUrls, driver);
    }
    if(yourBrandUrls.length > 0) {
        await loginYourBrand(driver)
        await yourBrandLogic(yourBrandUrls, driver);
    }
}

async function checkout(order) {
    try {
        await createDriver();
        await addToCart(driver, order);
        await delay(2000);
    } catch(error) {
        console.error("Checkout error: " + error);
    } finally {
        await closeDriver();
    }
    
}

module.exports = checkout;
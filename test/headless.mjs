import { Builder } from 'selenium-webdriver'
import { By } from 'selenium-webdriver'
import { Options } from "selenium-webdriver/chrome.js";
import { assert } from 'chai'

const options = new Options();
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

describe('test swe-alpha', async function(){
    this.timeout(60000);
    let driver, startButton, healthBar, health;

    beforeEach(async function(){
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options.addArguments('--headless')) // remove to see what is happening
            .build();
        await driver.get('http://127.0.0.1:8080/');
        await sleep(10000);
    })

    it('start the game & check health', async function(){
        await driver.executeScript('closeStartScreen()');
        await sleep(1000);
        healthBar = await driver.findElement(By.xpath('//div[@id="healthBarBorder"]'));
        await sleep(1000);
        health = healthBar.getCssValue('--p');
        assert(health, 100);

    })

    afterEach(async function () {
        if (driver) {
            // Close the browser
            await driver.quit();
        }
    });
});


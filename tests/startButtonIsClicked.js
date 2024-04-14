const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Button Click Test', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should click the start button', async function() {
        await driver.get('https://nmarhari.github.io/SWE-Alpha/');
        await driver.findElement(By.id('startButton')).click();
        await driver.wait(async () => {
            return await driver.executeScript('return closedStartScreen();');
        }, 5000);
        // Add more assertions if needed
    });

    after(async function() {
        await driver.quit();
    });
});

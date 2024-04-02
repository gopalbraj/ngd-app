// scripts/puppeteer-lighthouse.js

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { promisify } = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile);

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222'],
        headless: true
    });

    const page = await browser.newPage();
    await page.goto('https://verizon-nextjs-sandbox-default.glb.edgio.link/ngd/blueprint/smartphones');

    // Assume the login form has input fields with IDs 'username' and 'password', and a submit button with ID 'login'.
    //await page.type('#username', 'demo');
    //await page.type('#password', 'demo');
    //await page.click('#login');
    //await page.waitForNavigation();

    // Go to a specific page to audit
    //await page.goto('https://example.com/protected-page');

    // Run Lighthouse. Note: you might need additional configuration for authentication, etc.
    const lighthouseOptions = { port: 9222 };
    const result = await lighthouse(page.url(), lighthouseOptions);
    await browser.close();

    // Save the Lighthouse report to a file
    const reportJson = result.report;
    await writeFileAsync('lighthouse_report.json', reportJson);
})();

const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');

async function analyzeHtmlContent(htmlString) {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setContent(htmlString, { waitUntil: 'networkidle0' });

  const axeResults = await new AxePuppeteer(page).analyze();
  const screenshot = await page.screenshot({ fullPage: true });

  await browser.close();

  return { axeResults, screenshot };
}

async function analyzeUrl(url) {
  const browser = await puppeteer.launch({ headless: 'new', 
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
    ] 
});
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/102 Safari/537.36');


  // Run axe-core analysis
  const axeResults = await new AxePuppeteer(page).analyze();

  // Take screenshot
  const screenshot = await page.screenshot({ fullPage: true });

  await browser.close();

  // Run Lighthouse separately
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const lhResult = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['accessibility']
  });
  await chrome.kill();

  return {
    axeResults,
    lhResult: lhResult.lhr,
    screenshot
  };
}

module.exports = { analyzeUrl, analyzeHtmlContent };
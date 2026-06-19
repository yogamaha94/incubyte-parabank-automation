const { Before, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

let browser;
let context;
let page;

Before(async function () {
    const userDataDir = path.join(__dirname, '../../.user-data');
    if (!fs.existsSync(userDataDir)) {
        fs.mkdirSync(userDataDir, { recursive: true });
    }

    context = await chromium.launchPersistentContext(userDataDir, {
        channel: 'chrome',
        headless: false,
        args: [
            '--disable-blink-features=AutomationControlled',
            '--disable-infobars',
            '--no-sandbox',
            '--disable-dev-shm-usage',
        ],
        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'en-US',
        viewport: { width: 1280, height: 800 },
        javaScriptEnabled: true,
    });

    page = context.pages().length ? context.pages()[0] : await context.newPage();

    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
        Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
        Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
        window.navigator.chrome = { runtime: {} };
    });

    this.context = context;
    this.page = page;
});

After(async function () {
    if (this.page && !this.page.isClosed()) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
});

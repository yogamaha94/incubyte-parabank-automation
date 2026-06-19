const { Given, When, Then } =
require("@cucumber/cucumber");

const LoginPage =
require("../../pages/LoginPage");

const AccountPage =
require("../../pages/AccountPage");

const user =
require("../../test-data/userData");

const fs = require('fs');
const path = require('path');

const ensureDirectory = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

Given("User has a registered account",
async function () {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC", { waitUntil: 'domcontentloaded', timeout: 30000 });
});

When("User enters valid login credentials",
async function () {

    const login =
    new LoginPage(this.page);

    const credFile = path.join(__dirname, '../../.registered-user.json');
    if (!fs.existsSync(credFile)) {
        throw new Error('No registered credentials found. Run signup first or ensure .registered-user.json exists.');
    }

    const creds = JSON.parse(fs.readFileSync(credFile, 'utf-8'));
    const username = creds.username;
    const password = creds.password;

    console.log("Using registered credentials from signup");
    console.log("Using credentials - Username: " + username + ", Password: " + password);

    await login.login(username, password);
});

Then("User should login successfully",
async function () {

    await this.page.waitForLoadState('networkidle');

    const pageTitle = await this.page.title();
    console.log("Page Title after login: " + pageTitle);

    const reportsDir = path.join(__dirname, '../../reports');
    const accountTable = await this.page.waitForSelector('#accountTable', { timeout: 15000 });
    if (!accountTable) {
        ensureDirectory(path.join(reportsDir, 'login-error.png'));
        await this.page.screenshot({ path: path.join(reportsDir, 'login-error.png') });
        throw new Error("Login failed - Account table not found. Not on accounts page.");
    }

    ensureDirectory(path.join(reportsDir, 'login-success.png'));
    await this.page.screenshot({ path: path.join(reportsDir, 'login-success.png') });
    console.log('Saved login screenshot to reports/login-success.png');

    const credFile = path.join(__dirname, '../../.registered-user.json');
    if (fs.existsSync(credFile)) {
        fs.unlinkSync(credFile);
        console.log('Removed temporary registered user file');
    }

    console.log("✓ Login successful - Account table found");
});

Then("User balance should be displayed",
async function () {

    const reportsDir = path.join(__dirname, '../../reports');
    await this.page.waitForSelector('#accountTable', { timeout: 10000 });
    ensureDirectory(path.join(reportsDir, 'balance.png'));
    await this.page.screenshot({ path: path.join(reportsDir, 'balance.png') });
    console.log('Saved balance screenshot to reports/balance.png');
});

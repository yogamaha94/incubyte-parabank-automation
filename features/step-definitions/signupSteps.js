const { Given, When, Then } =
require("@cucumber/cucumber");

const RegisterPage =
require("../../pages/RegisterPage");

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

Given("User launches parabank application",
async function () {
    await this.page.goto(
    "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC", { waitUntil: 'domcontentloaded', timeout: 30000 });
});

When("User navigates to registration page",
async function () {

    await this.page.click("text=Register");
});

When("User enters registration details",
async function () {

    const register =
    new RegisterPage(this.page);

    await register.register(user);
});

When("User submits registration form",
async function () {
});

Then("User account should be created successfully",
async function () {

    await this.page.waitForTimeout(3000);

    const reportsDir = path.join(__dirname, '../../reports');
    ensureDirectory(path.join(reportsDir, 'registration-success.png'));
    await this.page.screenshot({ path: path.join(reportsDir, 'registration-success.png') });
    console.log('Saved registration screenshot to reports/registration-success.png');

    const registrationHeader = await this.page.textContent('h1').catch(() => null);
    if (!registrationHeader || !registrationHeader.toLowerCase().includes('welcome')) {
        const title = await this.page.title().catch(() => null);
        const url = this.page.url();
        const bodyText = await this.page.textContent('body').catch(() => '');
        const snippet = bodyText ? bodyText.substring(0, 500) : '';
        const screenshotPath = 'reports/signup-failure.png';
        ensureDirectory(screenshotPath);
        await this.page.screenshot({ path: screenshotPath });
        console.log('Registration failed page title:', title);
        console.log('Registration failed URL:', url);
        console.log('Registration failed body snippet:', snippet);
        console.log('Screenshot saved to', screenshotPath);
        throw new Error('Registration did not complete successfully');
    }

    console.log(
    "Registered User = "
    + user.username);
    
    // Save registered credentials to a file for login scenario to use
    const credentials = {
        username: user.username,
        password: user.password
    };
    
    const credFile = path.join(__dirname, '../../.registered-user.json');
    fs.writeFileSync(credFile, JSON.stringify(credentials, null, 2));
    console.log("Credentials saved for login");
});

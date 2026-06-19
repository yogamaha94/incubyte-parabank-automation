const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const RegisterPage = require('../../pages/RegisterPage');
const LoginPage = require('../../pages/LoginPage');
const AccountPage = require('../../pages/AccountPage');
const { validUser, loginUser } = require('../../test-data/userData');

let browser;
let page;
let registerPage;
let loginPage;
let accountPage;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  registerPage = new RegisterPage(page);
  loginPage = new LoginPage(page);
  accountPage = new AccountPage(page);
});

After(async function () {
  await browser.close();
});

Given('the user is on the login page', async function () {
  await loginPage.goto();
});

When('the user submits valid login credentials', async function () {
  await loginPage.login(loginUser);
});

Then('the user should be redirected to the account overview page', async function () {
  await page.waitForURL('**/accounts/**');
  if (!(await accountPage.isVisible())) {
    throw new Error('Account overview page not visible');
  }
});

Given('the user is on the registration page', async function () {
  await registerPage.goto();
});

When('the user submits valid registration details', async function () {
  await registerPage.register(validUser);
});

Then('the user account should be created successfully', async function () {
  await page.waitForURL('**/register.htm');
  const confirmation = await page.locator('h1').textContent();
  if (!confirmation?.includes('Welcome')) {
    throw new Error('Registration confirmation not found');
  }
});

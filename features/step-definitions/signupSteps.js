const { Given, When, Then } =
require("@cucumber/cucumber");

const { chromium } =
require("playwright");

const RegisterPage =
require("../../pages/RegisterPage");

const user =
require("../../test-data/userData");

let browser;
let page;

Given("User launches parabank application",
async function () {

    browser =
    await chromium.launch({
        headless:false
    });

    page =
    await browser.newPage();

    await page.goto(
    "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
});

When("User navigates to registration page",
async function () {

    await page.click("text=Register");
});

When("User enters registration details",
async function () {

    const register =
    new RegisterPage(page);

    await register.register(user);
});

When("User submits registration form",
async function () {
});

Then("User account should be created successfully",
async function () {

    await page.waitForTimeout(3000);

    console.log(
    "Registered User = "
    + user.username);
});

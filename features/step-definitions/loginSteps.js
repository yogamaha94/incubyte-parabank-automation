const { Given, When, Then } =
require("@cucumber/cucumber");

const LoginPage =
require("../../pages/LoginPage");

const AccountPage =
require("../../pages/AccountPage");

const user =
require("../../test-data/userData");

Given("User has a registered account",
async function () {
});

When("User enters valid login credentials",
async function () {

    const login =
    new LoginPage(page);

    await login.login(
        user.username,
        user.password
    );
});

Then("User should login successfully",
async function () {

    await page.waitForLoadState();
});

Then("User balance should be displayed",
async function () {

    const account =
    new AccountPage(page);

    await account.printBalance();

    await page.screenshot({
        path:"reports/balance.png"
    });

    await browser.close();
});

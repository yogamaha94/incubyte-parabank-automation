class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('input[value="Log In"]');
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/login.htm');
  }

  async login(credentials) {
    await this.username.fill(credentials.username);
    await this.password.fill(credentials.password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;

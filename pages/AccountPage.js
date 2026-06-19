class AccountPage {
  constructor(page) {
    this.page = page;
    this.welcomeMessage = page.locator('h1');
    this.logoutLink = page.locator('a[href="/parabank/logout.htm"]');
  }

  async isVisible() {
    return await this.welcomeMessage.isVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = AccountPage;

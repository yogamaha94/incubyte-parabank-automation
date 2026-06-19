class LoginPage {

    constructor(page){

        this.page = page;

        this.username = page.locator("input[name='username']");
        this.password = page.locator("input[name='password']");
        this.loginBtn = page.locator("input[value='Log In']");
    }

    async login(username,password){

        await this.username.fill(username);
        await this.password.fill(password);

        await this.loginBtn.click();
    }
}

module.exports = LoginPage;

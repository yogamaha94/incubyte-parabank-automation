class AccountPage {

    constructor(page){

        this.page = page;

        this.balance =
        page.locator("#accountTable tbody tr:first-child td:nth-child(2)");
    }

    async printBalance(){

        const amount =
        await this.balance.textContent();

        console.log("================================");
        console.log("ACCOUNT BALANCE : " + amount);
        console.log("================================");
    }
}

module.exports = AccountPage;

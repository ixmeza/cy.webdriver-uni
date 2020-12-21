class HomePage{
    visit()
    {
        cy.visit("/");
        cy.url().should("include", "webdriveruniversity.com");
    }

}
export default new HomePage();
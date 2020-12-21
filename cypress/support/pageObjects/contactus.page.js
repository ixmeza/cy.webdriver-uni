class ContactUsPage{
    visit()
    {
        cy.visit("/Contact-Us/contactus.html");
        cy.url().should("include", "webdriveruniversity.com")
    }
    get firstName(){
        return cy.get('[name="first_name"]')
    }
    get lastName(){
        return cy.get('[name="last_name"]')
    }
    get email(){
        return cy.get('[name="email"]')
    }
    get message(){
        return cy.get('[name="message"]')
    }
    get reset(){
        return cy.get('[type="reset"]')
    }
    get submit(){
        return cy.get('[type="submit"]')
    }
}
export default ContactUsPage
/// <reference types="cypress" />

import faker from 'faker';
import ContactUsPage from '../../support/pageObjects/contactus.page'

context('E2E test for contact us form ', () => {
  const contactus = new ContactUsPage()  
    beforeEach(() => {
      cy.visit('/index.html');
      
      cy.get('#contact-us')
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(`/${href}`)
      })
    })

    it('I should be able to reset contact us form', () => {
      contactus.firstName.type("first_name")
      contactus.lastName.type("first_name")
      contactus.email.type("email")
      contactus.message.type("message")
      contactus.reset.click();
    })

    it('I should not able to submit contact us if having invalid data', () => {
      contactus.firstName.type("first_name")
      contactus.lastName.type("first_name")
      contactus.email.type("email")
      contactus.message.type("test_data")
      contactus.submit.click();
      cy.get('body').should('have.text','\n\n\n Error: Invalid email address\n\n\n')
    })

    it('I should be able to submit contact us if having valid data', () => {
      contactus.firstName.type("Jon")
      contactus.lastName.type("Doe")
      contactus.email.type("john_doe@mail.com")
      contactus.message.type("hello world!")
      contactus.submit.click();
      cy.get('h1').should('have.text', 'Thank You for your Message!')
    })

    it('I should be able to submit contact us using fixture data', () => {
      cy.fixture('contactus-data').then(function (test_data){
        contactus.firstName.type(test_data.first_name)
        contactus.lastName.type(test_data.last_name)
        contactus.email.type(test_data.email)
        contactus.message.type(test_data.message)
        contactus.submit.click()
        cy.get('h1').should('have.text', 'Thank You for your Message!')
      })
    })

    it('I should be able to submit contact us using faker library', () => {
      contactus.firstName.type(faker.name.firstName())
      contactus.lastName.type(faker.name.lastName())
      contactus.email.type(faker.internet.email())
      contactus.message.type(faker.lorem.paragraph())
      contactus.submit.click()
      cy.get('h1').should('have.text', 'Thank You for your Message!')
    })
})
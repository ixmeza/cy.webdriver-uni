/// <reference types="cypress" />
const testData = require("../../fixtures/testData.json");


describe("Dynamically Generated Tests Using json object", () => {
  testData.forEach((testDataRow: any)  => {
    const data = {
      first_name: testDataRow.first_name,
      last_name: testDataRow.last_name,
      email: testDataRow.email,
      message: testDataRow.message
    };

    context(`Generating a test for ${data.first_name}`, () => {
      it("Should submit the form with data from json", () => {
        cy.visit('/index.html');
        cy.get('#contact-us')
        .should('have.attr', 'href')
        .then((href) => {
          cy.visit(`/${href}`)
        })

        cy.get('[name="first_name"]').type(data.first_name)
        cy.get('[name="last_name"]').type(data.last_name)
        cy.get('[name="email"]').type(data.email)
        cy.get('[name="message"]').type(data.message)
        cy.get('[type="submit"]').click()
        cy.get('h1').should('have.text', 'Thank You for your Message!')
      });
    });
  });
});
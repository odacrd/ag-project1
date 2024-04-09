/// <reference types="cypress" />

describe("login scenarios", () => {
    beforeEach(() => {
        cy.visit("https://agexpert.ca/");
        cy.get("#onetrust-reject-all-handler").click();
        cy.findByText("Sign in")
        .should("be.visible")
        .click();
        cy.get('.main-container');  
      })
    it.skip('should validate missing password', () => {  
        cy.get('#signInName').should("be.visible")
            .type("od5514690@gmail.com");
        cy.get('#password').should("be.visible")
        cy.get("#next").click();
        cy.findByRole("alert").contains("Please enter your password");
    });

    it.skip('should validate incorrect password', () => {
        cy.get('#signInName').should("be.visible")
            .type("od5514690@gmail.com");
        cy.get('#password').should("be.visible")
            .type("wrong_pwd");
        cy.get("#next").click();
        cy.findAllByRole('alert').contains("The information you provided can't be validated.");
    });

    it('validate successful login', () => {
        cy.get('#signInName').should("be.visible")
        .type("od5514690@gmail.com");
        cy.get('#password').should("be.visible")
        .type("agExpert!23");
        cy.get("#next").click();
        cy.wait(2000);
        cy.get('.agx-page-title').should("be.visible");
        
        cy.get('.agx-button').contains('Go to Field').click();
        cy.url().then((url) => {
            cy.log('Current URL is: ' + url)
          })
        cy.wait(12000);
    });
})
/// <reference types="cypress" />

describe("login scenarios", () => {
    beforeEach(() => {
        cy.visit("https://agexpert.ca/");
        cy.get('#onetrust-accept-btn-handler').click();
        //cy.get("#onetrust-reject-all-handler").click();
        cy.findByText("Sign in").should("be.visible").click();
      });
    it('should validate missing password', () => {  
        cy.get('#signInName').should("be.visible")
            .type("od5514690@gmail.com");
        cy.get('#password').should("be.visible")
        cy.get("#next").click();
        cy.findByRole("alert").contains("Please enter your password");
    });

    it('should validate incorrect password', () => {
        cy.get('#signInName').should("be.visible")
            .type("od5514690@gmail.com");
        cy.get('#password').should("be.visible")
            .type("wrong_pwd");
        cy.get("#next").click();
        cy.findAllByRole('alert').contains("The information you provided can't be validated.");
    });

    it('validate successful login', () => {
       let xx = "https://agexpert.b2clogin.com/agexpert.onmicrosoft.com/"
        // Login using cy.origin to avoid CORs error 
        cy.origin(xx, ()=> {
            cy.get('#signInName').should("be.visible").type("od5514690@gmail.com");
            cy.get('#password').type("agExpert!23");
            cy.get("#next").click();
        });
        cy.get('.agx-page-title').should("be.visible");
    });

})
import { FieldPage } from "../pages/field.page";

export class HomePage{
    visit(){
        cy.visit('https://home.agexpert.ca/en');
        return this;
    }

    waitForPage(){
        cy.get('ag-start', { timeout: 30000 }).should('be.visible');
        return this;
    }

    // click link for 'Field' page
    goToFieldPage(){
        cy.get('.agx-button').contains('Go to Field').should("be.visible").click();
        return new FieldPage;    
    }
}
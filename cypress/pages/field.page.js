import { ContractsPage } from "../pages/contracts.page";

export class FieldPage{
    visit(){
        cy.visit('https://field.agexpert.ca/en');
        return this;
    }
    
    waitForPage(){
        //cy.get('home', { timeout: 10000 }).should('be.visible');
        cy.get('.agx-card-title').contains('Inventory').should("be.visible");
        cy.wait(2000);
        return this;
    }
    
    

    show_navigation(){
        cy.get('.agx-drawer-toggle').click();
        cy.get(".drawer-content").should("be.visible");
        cy.wait(2000);
        return this;
    }

    click_Inventory_Contracts(){

        cy.get('#button-expand-collapse-inventory').should("be.visible").click();
        cy.get(".drawer-content").should("not.be.visible");
        cy.wait(2000);
        cy.get('.agx-drawer-toggle').click();
        cy.get(".drawer-content").should("be.visible");
  
        cy.wait(2000);
        cy.get("#link-contracts").should("be.visible").click();
        return new ContractsPage;
        
    }
}
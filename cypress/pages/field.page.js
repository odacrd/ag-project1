import { ContractsPage } from "../pages/contracts.page";

export class FieldPage{
    visit(){
        cy.visit('https://field.agexpert.ca/en');
        return this;
    }
    
    // wait for page to load
    waitForPage(){
        cy.get('.agx-card-title').contains('Inventory').should("be.visible");
        cy.wait(2000);
        return this;
    }
    
    // click to make the drawer menu appear from the left
    show_drawerMenu(){
        cy.get('.agx-drawer-toggle').should("be.visible").click();
        cy.get(".drawer-content").should("be.visible");
        cy.wait(2000);
    }

    // click to expose the 'Inventory' menu
    // and click again on 'Contracts'
    click_Inventory_Contracts(){
        this.show_drawerMenu();
        cy.get('#button-expand-collapse-inventory').should("be.visible").click();
        cy.wait(2000);
        
        this.show_drawerMenu();
        cy.get("#link-contracts").should("be.visible").click();
        cy.wait(2000);
        return new ContractsPage;  
    }

    // click to expose the 'More' menu
    // and click again on 'Contacts'
    click_More_Contacts(){
        this.show_drawerMenu();
        cy.get('#button-expand-collapse-more').should("be.visible").click();
        cy.wait(2000);     
  
        this.show_drawerMenu()
        cy.get("#link-contacts").should("be.visible").click();
        cy.wait(2000); 
        return new ContractsPage;  
    }
}
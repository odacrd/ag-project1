import { NewContractPage} from "../pages/new_contract.page";

export class ContractsPage{
    visit(){
        cy.visit('https://contracts.agexpert.ca/en');
        return this;
    }

    waitForPage(){
        cy.get('ag-contracts', { timeout: 10000 }).should('be.visible');
        return this;
    }

    click_AddContract(){
        cy.get("button[routerlink='/contracts/add']").should("be.visible").click();
        return new NewContractPage;
    }

   

    viewContractSummary(){
        cy.get('ag-contracts .agx-expansion-panel-header.summary-header').should('be.visible').click();
        cy.get('ag-contracts .agx-expansion-panel-content.agx-expanded').should('be.visible');
        return this;
    }
}
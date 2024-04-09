
import { ContractsPage} from "../pages/contracts.page";

export class NewContractPage{
    
    waitForPage(){
        cy.get('.agx-card-content.contract-card-content').should("be.visible");
		cy.get('.agx-card-title').contains('Details').should("be.visible");
        return this;
    }
    
    // select a pre-populated buyer for simplicity
    chooseBuyer(buyerName){
        cy.get('[data-cy=select-buyer]').contains("Choose").should("be.visible").click();
        cy.get('.mat-option-text').contains(`${buyerName}`).click();
        return this;
    }

    enterContractNumber(number){
        cy.get('input[formcontrolname=number]').should("be.visible").type(`${number}{enter}`);
        return this;
    }

    selectType(typeName){
        cy.get('mat-select[formcontrolname=type]').should('be.visible').click();
        cy.get('.mat-option-text').contains(`${typeName}`).should('be.visible').click();
        return this;
    }
    
    // if cropName and variety are already in the dropdown, use it
    // otherwise go add a new Crop
    addCrop(cropName,variety,costPerBag, seedRate, comments){
        cy.get('[data-cy=select-crop]').scrollIntoView();
        cy.get('[data-cy=select-crop]')
        .contains("Choose").should("be.visible").click();

        let foundit = false;
        cy.get('div[id^=mat-select] .mat-option-text')
            .each( $el => {
                if ($el.text().includes(`${cropName} (${variety})`)){
                    // cropName and variety are already in the list, use it
                    cy.wrap($el).click();
                    foundit = true;
                }
            }
        ).then( () =>{  
        // if not in dropdown go add a new Crop and save it         
        if(!foundit){
            cy.log(`foundit ${foundit}`);
            cy.get('.agx-select-input-wrapper > .agx-button > .agx-button-wrapper > .agx-button-infix')
                .should("be.visible").click();
            cy.get('.ag-seed-input-crop-year-flyout > .agx-page > .agx-page-header')
                .should("be.visible");

            cy.addSeedDetails(cropName,variety,costPerBag, seedRate, comments);
            this.saveNewSeed();
        } });   
            
        return this;
    }

    saveNewSeed(){
        cy.get('ag-modal-panel-flyout [data-cy=btn-save]').click();
        cy.get('ag-modal-panel-flyout').should('not.exist');
        cy.wait(2000);
    }

    cancelNewSeed(){
        cy.get('ag-modal-panel-flyout [data-cy=btn-cancel]').click();
        cy.get('ag-modal-panel-flyout').should('not.exist');
        cy.wait(2000);
        return this;
    }

    saveContract(){
        cy.get('ag-contract agx-page-footer button')
            .contains('Save').should('be.visible').click();
        cy.get('ag-contract').should('not.exist');
        return new ContractsPage;
    }

    cancelContract(){
        cy.get('ag-contract agx-page-footer button')
            .contains('Cancel').should('be.visible').click();
        cy.get('ag-contract').should('not.exist');
        return new ContractsPage;
    }
}
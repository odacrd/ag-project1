
import { ContactsPage} from "../pages/contacts.page";

export class NewContactPage{
    
    // wait for page to load
    waitForPage(){
        cy.get('ag-contact-details-form').as('form').should("be.visible");
        return this;
    }

    //enter info for new contact
    enterContactInfo(firstname, lastname, companyname, contactType){
        cy.get('@form').should("be.visible").within(()=>{
            cy.get('input[formcontrolname=firstName]').type(`${firstname}{enter}`);
            cy.get('input[formcontrolname=lastName]').type(`${lastname}{enter}`);
            cy.get('input[formcontrolname=companyName]').type(`${companyname}{enter}`);
            
            if (`${contactType}` == 'customer'){
                cy.get('input[value="labourer"]').uncheck(); //uncheck Employee
                cy.get('input[value="customer"]').check();   // check Customer
            } else {
                cy.get('input[value="labourer"]').check(); //uncheck Employee
                cy.get('input[value="customer"]').uncheck();   // check Customer
            }
        });
        return this;
    }

    saveContact(){
        cy.get('ag-contact agx-page-footer button')
            .contains('Save').should('be.visible').click();
        cy.get('@form').should('not.exist');
        return new ContactsPage;
    }

    cancelContact(){
        cy.get('ag-contact agx-page-footer button')
            .contains('Cancel').should('be.visible').click();
        cy.get('@form').should('not.exist');
        return new ContactsPage;
    }
}
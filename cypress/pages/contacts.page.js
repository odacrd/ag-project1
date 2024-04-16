import { NewContactPage} from "../pages/new_contact.page";

export class ContactsPage{

    // wait for page to load
    waitForPage(){
        cy.get('ag-contacts-list', { timeout: 10000 }).should("be.visible");
        return this;
    }

    // click the 'Add Contact' button
    click_AddContact(){
        cy.get("a[href='/en/contacts/add']")
        .scrollIntoView()
        .should("be.visible").click();
        return new NewContactPage;   
    }

    //verify the newly added contact appears in the list
    verify_ContactInList(firstname,lastname,companyName,contactType){
        // select the Employee or Customers tab as per contactType
        cy.get('.mat-mdc-tab-list').scrollIntoView();
        if (`${contactType}` == 'customer'){
            cy.get('label[data-cy=customer-tab]')
            .should("be.visible").click();
        } else{
            cy.get('label[data-cy=employee-tab]')
            .should("be.visible").click();
        }
        //verify the correct tab is selected
        cy.get('.mat-mdc-tab-list div[id^="mat-tab-label-"][aria-selected="true"]').contains(`${contactType}`, { matchCase: false });
        
        // find list item for the contact firstname lastname and companyname
        cy.get('agx-table[class="agx-table cdk-table"]').scrollIntoView();
        cy.get('agx-row')
        .contains(`${firstname} ${lastname} - ${companyName}`,{ matchCase: false });
        // this work too
        //.find("agx-cell:contains("+`${firstname} ${lastname} - ${companyName}`+")");

        return this;
    }
}
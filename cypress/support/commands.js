
import "@testing-library/cypress/add-commands";


//Login script assumes CORs security is off
Cypress.Commands.add("xlogin", () => {
    //launch Sign in page from main website
    cy.visit("https://agexpert.ca/");

    // Reject cookies
		cy.get("#onetrust-reject-all-handler").click();
    //cy.get('#onetrust-accept-btn-handler').click();

		cy.findByText("Sign in").should("be.visible").click();
		cy.get('.main-container',{ timeout: 20000 }).should('be.visible'); 

    // enter username and pwd
		cy.get('#signInName').should("be.visible").type("od5514690@gmail.com");
		cy.get('#password').type("agExpert!23");
		cy.get("#next").click();

    // wait for login dialog to close
    cy.get('#next', { timeout: 20000 }).should("not.exist");

  } 
);

Cypress.Commands.add("addSeedDetails",(cropName, variety, costPerBag, seedRate, notes) => {
  // select a crop from the dropdown  
  cy.get('[data-cy=select-input-seed]').should("be.visible").click();
    cy.get('#select-seed-panel').find('[id^=mat-input-]')
      .should("be.visible").type(`${cropName}{enter}`);
      cy.wait(2000);

    // select a variety from the dropdown  
    cy.get('[data-cy=select-seed-variety]').should("be.visible").click();

    let foundit = false;
    cy.get('#select-seedVariety-panel .mat-option-text')
        .each( $el => {
            if ($el.text().includes(`(${variety})`)){
                // variety is in the list, so use it
                cy.wrap($el).click();
                foundit = true;
            }
        }
    ).then( () =>{  
    // if variety not in dropdown then add the first one listed        
    if(!foundit){
        cy.get('#seed-variety-1').should('be.visible').click();
    } }); 

    cy.wait(2000);

    // enter a cost per bag
    cy.get('#textbox-amount').type(`${costPerBag}{enter}`);
    cy.get('#select-cost-unit').click();
    cy.get('#select-cost-unit-panel mat-option').contains('bag').click();
    cy.wait(2000);

    // enter a seed rate per bag
    cy.get('#textbox-seeding-rate').type(`${seedRate}{enter}`)
    cy.get('#select-seeding-rate').click();
    cy.get('#select-seeding-rate-panel mat-option').contains('bag').click(); 
    
    // enter note text
    cy.get('ag-seed-input-crop-year-form textarea[formcontrolname=notes]')
      .type(`${notes}{enter}`);
  }
);







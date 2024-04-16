import "@testing-library/cypress/add-commands";

//Login script assumes CORs security is off
Cypress.Commands.add("xlogin", () => {
  //Go to main website and accept cookies
  cy.visit("https://agexpert.ca/");
  cy.get("#onetrust-accept-btn-handler").click();

  //launch login page
  cy.findByText("Sign in").should("be.visible").click();
  cy.get(".main-container", { timeout: 20000 }).should("be.visible");

  // Login using cy.origin to avoid CORs error
  cy.origin("https://agexpert.b2clogin.com", () => {
    cy.get("#signInName").should("be.visible").type("od5514690@gmail.com");
    cy.get("#password").type("agExpert!23");
    cy.get("#next").click();
  });
});

Cypress.Commands.add("choose_randomOption", (locator) => {

  // get the number of elements in the list
  // pick a random index number excluding 0
  cy.get(locator)
    .then((list) => {
      const listcount = Cypress.$(list).length;
      cy.log(`number of items in list: ${listcount}`);
      const random = Math.floor(Math.random() * (listcount - 1)) + 1;
      cy.log(`random number: ${random}`);
      cy.get(locator).eq(random).as('randomItem');
    });
    // select this random item and get its text
    cy.get('@randomItem')
    .then(($el) => {
      cy.wrap($el).scrollIntoView().click();
      return cy.wrap($el.text().trim());
    });
    
});



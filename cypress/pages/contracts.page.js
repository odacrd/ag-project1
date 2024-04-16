import { NewContractPage } from "../pages/new_contract.page";

export class ContractsPage {
  visit() {
    cy.visit("https://contracts.agexpert.ca/en");
    return this;
  }

  waitForPage() {
    cy.get("ag-contracts", { timeout: 10000 }).should("be.visible");
    return this;
  }

  // click the 'Add Contract' button
  click_AddContract() {
    cy.get("button[routerlink='/contracts/add']").should("be.visible").click();
    return new NewContractPage();
  }

  verifyNewContractAdded(contractNumber) {
    // search for contract with contractNumber
    cy.get(".agx-data-filter-infix input")
      .should("be.visible")
      .type(contractNumber);

    // verify there's only 1 and checks it's contract number
    cy.get("agx-tile-list")
      .find(">agx-tile")
      .should("have.length", 1)
      .find("agx-tile-row")
      .contains(contractNumber);
    return this;
  }
}

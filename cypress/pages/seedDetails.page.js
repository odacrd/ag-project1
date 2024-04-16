import { NewContractPage } from "../pages/new_contract.page";

export class SeedDetailsPage {
  waitForPage() {
    cy.get(
      ".ag-seed-input-crop-year-flyout > .agx-page > .agx-page-header"
    ).should("be.visible");
    return this;
  }

  addNewSeedCrop(cropName) {
    //open the Crop dropdown
    cy.get("[data-cy=select-input-seed]").should("be.visible").click();

    if (cropName == "random") {
      // get the option list and choose random crop
      cy.get("#select-seed-panel .mat-option-text").as("options");
      cy.choose_randomOption("@options");
      cy.get("[data-cy=select-input-seed]").should("not.have.text", "Choose");
    } else {
      //choose specific crop
      cy.get("#select-seed-panel mat-option").contains(cropName).click();
      cy.get("[data-cy=select-input-seed]>span").should("include.text",cropName);
    }
    return this;
  }

  addNewSeedVariety(variety) {
    // open the Variety option list
    cy.get("[data-cy=select-seed-variety]").should("be.visible").click();

    // choose a random variety or a specific one
    return cy
      .get("#select-seedVariety-panel .mat-option-text")
      .as("options")
      .then(() => {
        // chosse a random variety
        if (variety == "random") {
          cy.choose_randomOption("@options");
          cy.get("[data-cy=select-seed-variety]").should(
            "not.have.text",
            "Choose"
          );
        } else {
          //choose a sepcific variety
          cy.get("#select-seedVariety-panel").then(($el) => {
            const locator = `.mat-option-text:contains(${variety})`;
            if ($el.find(locator).length) {
              cy.wrap($el.find(locator)).click();
              // flag the option was found and selected
              return cy.wrap(1);
            } else {
              // flag the option was not found
              return cy.wrap(0);
            }
          });
        }
      });
  }

  addAdditionalInfo(costPerBag, seedRate, notes) {
    // enter a cost per bag
    cy.get("#textbox-amount").type(`${costPerBag}{enter}`);
    cy.get("#select-cost-unit").click();
    cy.get("#select-cost-unit-panel mat-option").contains("bag").click();
    cy.wait(2000);

    // enter a seed rate per bag
    cy.get("#textbox-seeding-rate").type(`${seedRate}{enter}`);
    cy.get("#select-seeding-rate").click();
    cy.get("#select-seeding-rate-panel mat-option").contains("bag").click();

    // enter note text
    cy.get("ag-seed-input-crop-year-form textarea[formcontrolname=notes]")
      .scrollIntoView()
      .clear()
      .type(
      `${notes}{enter}`
    );
    return this;
  }

  saveNewSeed() {
    cy.get("ag-modal-panel-flyout [data-cy=btn-save]")
    .scrollIntoView()
    .click();
    cy.get("ag-modal-panel-flyout").should("not.exist");
    cy.wait(2000);
    return new NewContractPage();
  }

  cancelNewSeed() {
    cy.get("ag-modal-panel-flyout [data-cy=btn-cancel]").click();
    cy.get("ag-modal-panel-flyout").should("not.exist");
    cy.wait(2000);
    return new NewContractPage();
  }
}

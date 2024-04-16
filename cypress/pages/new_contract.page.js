import { ContractsPage } from "../pages/contracts.page";
import { SeedDetailsPage } from "../pages/seedDetails.page";

export class NewContractPage {
  cropName;
  variety;

  waitForPage() {
    cy.get(".agx-card-content.contract-card-content").should("be.visible");
    cy.get(".agx-card-title").contains("Details").should("be.visible");
    return this;
  }

  //choose a random or specific option
  chooseBuyer(buyerName) {
    // open the dropdown and get the options
    cy.get("[data-cy=select-buyer]")
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.get("#mat-select-16-panel .mat-option-text").as("options");

    //click on a random or specific option and verify
    if (buyerName == "random") {
      cy.choose_randomOption("@options").then((value) => {
        cy.get("[data-cy=select-buyer]>span").should("include.text", value);
      });
    } else {
      cy.get("@options").contains(`${buyerName}`).scrollIntoView().click();
      cy.get("[data-cy=select-buyer]").should("have.text", buyerName);
    }
    return this;
  }

  enterContractNumber(number) {
    cy.get("input[formcontrolname=number]")
      .should("be.visible")
      .type(`${number}{enter}`);
    return this;
  }

  // choose a random or specific option
  selectType(typeName) {
    cy.get("mat-select[formcontrolname=type]").should("be.visible").click();
    cy.get("#mat-select-14-panel .mat-option-text").as("options");

    if (typeName == "random") {
      cy.choose_randomOption("@options").then((value) => {
        cy.get("mat-select[formcontrolname=type]").should(
          "include.text",
          value
        );
      });
    } else {
      cy.get("@options").contains(`${typeName}`).scrollIntoView().click();
      cy.get("mat-select[formcontrolname=type]").should(
        "include.text",
        typeName
      );
    }
    return this;
  }

  verifyCropAdded() {
    cy.get("[data-cy=select-crop]>span").should(
      "have.text",
      `${this.cropName} (${this.variety})`
    );
  }

  //choose a random from Contract's Choose Crop list
  addPreviouslyUsedCrop(cropName, variety){
        this.addCrop(cropName, variety);
    return this;
  }

  //choose a random or specific option
  addCrop(cropName, variety) {
    this.cropName = cropName;
    this.variety = variety;

    // click to open dropdown and get options
    cy.get("[data-cy=select-crop]")
      .scrollIntoView()
      .should("be.visible")
      .click();

    return cy
      .get("#mat-select-10-panel .mat-option-text")
      .as("options")
      .then(() => {
        // select a random or specific option; return false if not found
        if (cropName == "random") {
          cy.choose_randomOption("@options");
        } else {
          cy.get("#mat-select-10-panel").then(($el) => {
            const locator = `.mat-option-text:contains(${cropName} (${variety}))`;
            if ($el.find(locator).length) {
              cy.wrap($el.find(locator)).click();
              return cy.wrap(1);
            } else {
              return cy.wrap(0);
            }
          });
        }
      });
  }

  // click Add a New Crop button
  click_Add_a_New_Crop() {
    cy.get(
      "#mat-select-10-panel agx-select-input-wrapper > button"
    )
      .should("be.visible")
      .click(); // launch New Seed form
    return new SeedDetailsPage();
  }

  saveContract() {
    cy.get("ag-contract agx-page-footer button")
      .contains("Save")
      .should("be.visible")
      .click();
    cy.get("ag-contract").should("not.exist");
    return new ContractsPage();
  }

  cancelContract() {
    cy.get("ag-contract agx-page-footer button")
      .contains("Cancel")
      .should("be.visible")
      .click();
    cy.get("ag-contract").should("not.exist");
    return new ContractsPage();
  }
}

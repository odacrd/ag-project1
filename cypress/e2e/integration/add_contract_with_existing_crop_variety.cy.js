/// <reference types="cypress" />
import { HomePage } from "../../pages/home.page";
import { FieldPage } from "../../pages/field.page";
import { ContractsPage } from "../../pages/contracts.page";
import { NewContractPage } from "../../pages/new_contract.page";
import { SeedDetailsPage } from "../../pages/seedDetails.page";
const dayjs = require("dayjs");

describe("add contracts", () => {
  before(() => {
    // login with hardcoded email and pwd
    cy.xlogin();
  });

  describe("add crop contract", () => {
    const homePage = new HomePage();
    const fieldPage = new FieldPage();
    const contractsPage = new ContractsPage();
    const newContractPage = new NewContractPage();
    const seedDetailsPage = new SeedDetailsPage();

    it("user can add a crop contract", () => {
      //NOTE: names are case sensitive
      // Use an exact names or 'random' to select a random crop
      const cropName = "APPLE";
      const variety = "AAC EVERSWEET";

      const todaysDate = dayjs().format("YYMMDDHHmm");
      cy.log(todaysDate);
      const contractNumber = todaysDate;

      homePage.waitForPage();
      homePage.goToFieldPage();

      fieldPage.waitForPage().click_Inventory_Contracts();

      contractsPage.click_AddContract();

      newContractPage
        .waitForPage()
        .chooseBuyer("random")
        .enterContractNumber(`${contractNumber}`) // make unique by using datetime
        .selectType("random")
        .addPreviouslyUsedCrop(cropName, variety) // or enter 'random'
        .saveContract()
        .verifyNewContractAdded(contractNumber);
    });
  });
});

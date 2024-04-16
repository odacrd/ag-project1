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
      const cropName = "APPLE";
      const variety = "AMBROSIA";

      const todaysDate = dayjs().format("YYMMDDHHmm");
      cy.log(todaysDate);
      const contractNumber = todaysDate;

      homePage
        .waitForPage()
        .goToFieldPage();

      fieldPage
        .waitForPage()
        .click_Inventory_Contracts();

      contractsPage.click_AddContract();

      newContractPage
        .waitForPage()
        .chooseBuyer("random")
        .enterContractNumber(`${contractNumber}`) // make unique by using datetime
        .selectType("random");

      newContractPage.addCrop(cropName, variety).then((cropAdded) => {
        if (cropAdded) {
          // crop was found and added
          newContractPage.verifyCropAdded();
        } else {
          // crop not found so add a new crop seed
          newContractPage.click_Add_a_New_Crop();
          seedDetailsPage
            .waitForPage()
            .addNewSeedCrop(cropName)
            .addNewSeedVariety(variety)

            // conditional branching here
            .then((newSeedVarietyAdded) => {
              if (newSeedVarietyAdded) { 
                // seed variety found and added
              } else {
                // seed variety is missing. Either select a random one..
                seedDetailsPage.addNewSeedVariety("random");
                // OR proceed with 'Let us know'
                //tbd
              }
              // fill in more data: costPerBag, seedrate, notes
              seedDetailsPage.addAdditionalInfo(
                "15",
                "10",
                `My comments for ${todaysDate}`
              );
              seedDetailsPage.saveNewSeed();
            });
        }
      });

      newContractPage.saveContract();

      contractsPage.verifyNewContractAdded(contractNumber);
    });
  });
});

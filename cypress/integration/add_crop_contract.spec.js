/// <reference types="cypress" />
import { HomePage } from "../pages/home.page";
import { FieldPage } from "../pages/field.page";
import { ContractsPage } from "../pages/contracts.page";
import { NewContractPage } from "../pages/new_contract.page";

describe("add contracts", () => {
	before(() => {cy.xlogin();});

	describe("add crop contract", () => {
        const homePage = new HomePage;
        const fieldPage = new FieldPage;
        const contractsPage = new ContractsPage;
        const newContractPage = new NewContractPage;

        it("user can add crop contracts", () => {
            homePage.waitForPage();
            homePage.goToFieldPage();

            fieldPage.waitForPage()
                .show_navigation()
                .click_Inventory_Contracts();
            
            contractsPage.click_AddContract();    

            newContractPage.waitForPage()
                .chooseBuyer('SeedsRUs')
                .enterContractNumber('1234561')
                .selectType('Futures')
                .addCrop('CANOLA','any','15','10',"My comments for Canola")
                .saveContract();

             contractsPage.viewContractSummary();
		});
	});    
});
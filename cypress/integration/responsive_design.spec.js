/// <reference types="cypress" />

/**
 * Responsive mode tests
 *
 * These cover viewport tests and resize the browser to specific modes
 * that change how the app gets displayed.
 *
 */

describe("responsive modes on various devices", () => {
	before(() => {
		cy.visit("https://agexpert.ca/");
		cy.get("#onetrust-reject-all-handler").click();
		cy.findByText("Sign in")
			.should("be.visible")
			.click();
		cy.get('.main-container');  
		cy.get('#signInName').should("be.visible")
			.type("od5514690@gmail.com");
		cy.get('#password').should("be.visible")
			.type("agExpert!23");
		cy.get("#next").click();
		cy.get('.agx-page-title').should("be.visible");    
	});

	// Execute this set of iphone tests in both portrait/landscape
	describe('iphone tests', () => {
		before(() => {
			cy.visit("https://home.agexpert.ca/en/");
			cy.get('.agx-button').contains('Go to Field')
				.should("be.visible")
				.click();
		});

		["portrait", "landscape"].forEach((orientation) => {
			describe(`in ${orientation}`, () => {
		// iPhone 6 preset
			beforeEach(() => cy.viewport("iphone-6", orientation));

				it("should not display drawer", () => {
					cy.get("#link-activities").should("not.be.visible");
				});

				it("should show and hide drawer", () => {
					// Open and close the drawer menu which slides out from the left
					cy.get('.agx-drawer-toggle').click();
					cy.get(".drawer-content").should("be.visible");
					cy.wait(2000);
					cy.get('.agx-drawer-toggle').click();
					cy.wait(2000);
				});
			});
		});
	});    

	describe("on tablet-sized screens", () => {
		before(() => {
			cy.visit("https://home.agexpert.ca/en/");
			cy.get('.agx-button').contains('Go to Field')
				.should("be.visible")
				.click();
		});

		it("should not display left menu", () => {
			// Use the iPad 2 
			cy.viewport("ipad-2");
			cy.get("#link-activities").should("not.be.visible");
			cy.wait(2000);
			cy.get('.agx-drawer-toggle').click();
			cy.get(".drawer-content").should("be.visible");
			cy.wait(2000);
			cy.get('.agx-drawer-toggle').click();
			cy.wait(2000);
		});

		it("should display left menu in landscape", () => {
			// Change the orientation to landscape
			cy.viewport("ipad-2", "landscape");
			cy.get("#link-activities").should("not.be.visible");
			cy.wait(2000);
			cy.get('.agx-drawer-toggle').click();
			cy.get(".drawer-content").should("be.visible");
			cy.wait(2000);
			cy.get('.agx-drawer-toggle').click();
			cy.wait(2000);
		}); 
	});

	describe("on larger screens", () => {
  
		it("should continue displaying drawer menu", () => {
			// The Macbook is one of the larger presets
			cy.viewport("macbook-15");
			cy.visit("https://home.agexpert.ca/en/");
			cy.get('.agx-button').contains('Go to Field')
				.should("be.visible")
				.click();
						
			cy.get("#link-activities").should("be.visible");
			cy.get('.agx-drawer-toggle').should("not.be.visible");
			cy.wait(2000);

		});
	});    
});


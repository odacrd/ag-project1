/// <reference types="cypress" />
import { HomePage } from "../../pages/home.page";
import { FieldPage } from "../../pages/field.page";
import { ContactsPage } from "../../pages/contacts.page";
import { NewContactPage } from "../../pages/new_contact.page";

const neatCSV = require("neat-csv");
const dayjs = require("dayjs");

let table;

describe("add contacts from csv", () => {
  const homePage = new HomePage();
  const fieldPage = new FieldPage();
  before(() => {
    cy.xlogin();

    cy.fixture("contacts.csv")
      .then(neatCSV)
      .then((data) => {
        table = data;
      })
      .then(console.table);

    homePage.waitForPage();
    homePage.goToFieldPage();

    fieldPage.waitForPage().click_More_Contacts();
  });

  describe("add customer contact from csv file", () => {
    const contactsPage = new ContactsPage();
    const newContactPage = new NewContactPage();

    it("add new Contact data and verify", () => {
      const todaysDate = dayjs().format("YYMMDDHHmm");
      cy.log(todaysDate);

      for (let i = 0; i < table.length; i++) {
        contactsPage.click_AddContact();
        newContactPage
          .waitForPage()
          .enterContactInfo(
            table[i]["FirstName"],
            table[i]["LastName"],
            `Company: ${todaysDate}`, // make unique by using datetime
            table[i]["ContactType"]
          )
          .saveContact();
        cy.wait(2000);

        // verify this latest entry
        contactsPage.verify_ContactInList(
          table[i]["FirstName"],
          table[i]["LastName"],
          `Company: ${todaysDate}`,
          table[i]["ContactType"]
        );
      }
      cy.wait(1000);
    });
  });
});

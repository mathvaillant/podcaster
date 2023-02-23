import { pages, layouts } from "/@/locales/pt-PT.json";
const locales = layouts.buildings.table.header_names;

const adminLoginCredentials = {
  name: "Admin",
  email: Cypress.env("DEFAULT_ADMIN_USER_EMAIL"),
  password: Cypress.env("DEFAULT_PASSWORD")
};

context("Buildings", () => {
  before(() => {
    cy.visit("/");
    cy.dataCy("email").type(adminLoginCredentials.email);
    cy.dataCy("password").type(adminLoginCredentials.password);
    cy.get("form").submit();
    cy.wait(1000);
    cy.url().then((url) => {
      const urlSplitted = url.split("/");
      urlSplitted.pop();
      urlSplitted.push("buildings");
      cy.visit(urlSplitted.join("/"));
    });
  });

  describe("Successful tests", () => {
    it("Title is correct", () => {
      cy.dataCy("pageTitle").should("contain.text", pages.buildings);
    });

    it("Search is correct", () => {
      cy.dataCy("parishSearch").within(() => {
        cy.get("div>input")
          .invoke("attr", "placeholder")
          .should("contain", "Freguesia");
      });
      cy.dataCy("ownerSearch").within(() => {
        cy.get("div>input")
          .invoke("attr", "placeholder")
          .should("contain", "Proprietário");
      });
    });

    it("Check Filters", () => {
      cy.dataCy("filterButton").should("exist");
      cy.dataCy("filterBody").should("not.exist");
      cy.dataCy("filterButton")
        .click()
        .then(() => {
          cy.dataCy("filterBody").should("exist");
          cy.dataCy("filterBody").within(() => {
            cy.get("div")
              .eq(0)
              .children()
              .eq(1)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .children()
              .within(($divs) => {
                expect($divs.length).to.be.eq(5);
              });
          });
        });
    });

    it("Check Map", () => {
      cy.get(".leaflet-container").should("exist");
    });

    it("Check Table", () => {
      cy.get(".ag-root-wrapper").should("exist");
      cy.wait(500);
      cy.get("span.ag-header-cell-text").within(($divs) => {
        expect($divs[0].innerText).to.be.eq(locales.identifier);
        expect($divs[1].innerText).to.be.eq(locales.street);
        expect($divs[2].innerText).to.be.eq(locales.number);
        expect($divs[3].innerText).to.be.eq(locales.parishName);
        expect($divs[4].innerText).to.be.eq(locales.type);
        expect($divs[5].innerText).to.be.eq(locales.postalCode);
        expect($divs[6].innerText).to.be.eq(locales.article);
        expect($divs[7].innerText).to.be.eq(locales.fraction);
        expect($divs[8].innerText).to.be.eq(locales.area);
        // expect($divs[9].innerText).to.be.eq(locales.patrimonialValue);
        // expect($divs[10].innerText).to.be.eq(locales.propertyAge);
      });

      cy.get(".ag-row").should("exist").should("have.length.above", 0);
    });
  });
});

export {};

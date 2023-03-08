/// <reference types="cypress" />

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-testid=${value}]`);
});

export {};

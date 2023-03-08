/* eslint-disable no-unused-vars */
import "./commands";

import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;

      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("mount", mount);

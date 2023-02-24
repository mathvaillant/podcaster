context("/", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept(
      { method: "GET", url: "**/us/rss/toppodcasts/**" },
      { fixture: "allData.json" }
    ).as("data");
    cy.wait(100);
  });

  describe("Check the header component", () => {
    it("Should exist", () => {
      cy.dataCy("tool_bar").should("exist");
      cy.dataCy("page_title").should("exist");
    });
  });

  describe("Check the filter component", () => {
    it("Should exist", () => {
      cy.dataCy("filter_podcasts").should("exist");
      cy.dataCy("badge").should("have.text", "100");
    });
  });

  describe("Check the cards", () => {
    it("Should have 100 cards", () => {
      cy.dataCy("podcasts_container")
        .should("exist")
        .find('[data-cy="podcast-card"]')
        .should("have.length", 100);
      cy.dataCy("podcast-card").each(($el) => {
        cy.wrap($el).find('[data-cy="card_image"]').should("exist");
        cy.wrap($el).find('[data-cy="card_name"]').should("exist");
        cy.wrap($el).find('[data-cy="card_author"]').should("exist");
      });
    });
  });

  describe("Check if number of results reflect correct number on badge", () => {
    it("Should have n results and the same amount on the badge", () => {
      cy.dataCy("filter_podcasts").type("sh");
      cy.dataCy("podcasts_container")
        .should("exist")
        .find('[data-cy="podcast-card"]')
        .then(($cards) => {
          cy.dataCy("badge").should("have.text", $cards.length);
        });
    });
  });
});

export {};

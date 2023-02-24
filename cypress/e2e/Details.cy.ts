context("/podcasts/:podcastId", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(2000);
    cy.dataCy("podcast-card")
      .eq(10)
      .click()
      .then(() => {
        cy.wait(2000);
        cy.url().then((url) => {
          expect(url).to.include("podcasts");
        });
      });
  });

  describe("Check the header component", () => {
    it("Should exist", () => {
      cy.dataCy("tool_bar").should("exist");
      cy.dataCy("page_title").should("exist");
    });
  });

  describe("Check the left card", () => {
    it("Should exist", () => {
      cy.dataCy("details_left_card").should("exist");
      cy.dataCy("details_left_card_img").should("exist");
      cy.dataCy("details_left_card_name").should("exist");
    });
  });

  describe("Check the right card - Table", () => {
    it("Should exist", () => {
      cy.dataCy("details_left_card").should("exist");
      cy.dataCy("details_left_card_img").should("exist");
      cy.dataCy("details_left_card_name").should("exist");
      cy.dataCy("episodes_title").should("exist");
      cy.dataCy("episodes_table").should("exist");
      cy.dataCy("episodes_table").should("exist");
      cy.dataCy("episodes_row").each(($el) => {
        cy.wrap($el).find('[data-cy="episodes_track_name"]').should("exist");
        cy.wrap($el).find('[data-cy="episodes_date"]').should("exist");
        cy.wrap($el).find('[data-cy="episodes_duration"]').should("exist");
      });
      cy.dataCy("episodes_track_name")
        .first()
        .click()
        .then(() => {
          cy.wait(2000);
          cy.location().then(({ pathname }) => {
            expect(pathname).to.includes("podcasts");
            expect(pathname).to.includes("episode");

            cy.dataCy("episode_title").should("exist");
            cy.dataCy("episode_audio").should("exist");
            cy.dataCy("episode_play")
              .should("exist")
              .trigger("click")
              .then(() => {
                cy.wait(500);
                cy.dataCy("episode_pause").should("exist");

                cy.wait(1000).then(() => {
                  cy.window().then((win) => {
                    const isPlaying =
                      win.document.getElementsByTagName("audio")[0]
                        .currentTime > 0 &&
                      !win.document.getElementsByTagName("audio")[0].paused &&
                      !win.document.getElementsByTagName("audio")[0].ended;
                    expect(isPlaying).to.be.true;
                  });
                });
              });
          });
        });
    });
  });
});

export {};

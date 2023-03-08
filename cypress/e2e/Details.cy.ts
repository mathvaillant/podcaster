context("/podcasts/:podcastId", () => {
  beforeEach(() => {
    cy.visit("/podcasts/1661154206");
    cy.intercept(
      { method: "GET", url: "**/us/rss/toppodcasts/**" },
      { fixture: "allData.json" }
    ).as("data");
    cy.intercept(
      {
        method: "GET",
        url: "**/lookup?id=1661154206&entity=podcastEpisode"
      },
      { fixture: "episodes.json" }
    ).as("data");
  });

  describe("Check the header component", () => {
    it("Should exist", () => {
      cy.dataCy("tool-bar").should("exist");
      cy.dataCy("page-title").should("exist");
    });
  });

  describe("Check the left card", () => {
    it("Should exist", () => {
      cy.dataCy("details_left_card").should("exist");
      cy.dataCy("details_left_card_img").should("exist");
      cy.dataCy("details_left_card_name").should("exist");
    });
  });

  describe("Check the right card", () => {
    it("Should exist", () => {
      cy.dataCy("details_left_card").should("exist");
      cy.dataCy("details_left_card_img").should("exist");
      cy.dataCy("details_left_card_name").should("exist");
      cy.dataCy("episodes_title").should("exist");
      cy.dataCy("episodes_table").should("exist");
      cy.dataCy("episodes_table").should("exist");
      cy.dataCy("episodes_row").each(($el) => {
        cy.wrap($el)
          .find('[data-testid="episodes_track_name"]')
          .should("exist");
        cy.wrap($el).find('[data-testid="episodes_date"]').should("exist");
        cy.wrap($el).find('[data-testid="episodes_duration"]').should("exist");
      });
    });
  });

  describe("Properly plays the podcast episode", () => {
    it("Should play the audio and check if timer started", () => {
      cy.dataCy("episodes_track_name").first().click();
      cy.wait(2000);

      cy.location().then(({ pathname }) => {
        expect(pathname).to.includes("podcasts");
        expect(pathname).to.includes("episode");
      });

      cy.dataCy("episode_title").should("exist");
      cy.dataCy("episode_audio").should("exist");
      cy.dataCy("episode_play").should("exist").trigger("click");

      cy.dataCy("episode_pause").should("exist");
      cy.wait(5000).then(() => {
        cy.dataCy("timer").should("not.have.text", "0:00:00");
      });
    });
  });
});

export {};

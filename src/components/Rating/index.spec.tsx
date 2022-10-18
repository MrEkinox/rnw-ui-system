import React from "react";
import { Rating } from "./index";

describe("Rating", () => {
  it("Color", () => {
    cy.mount(<Rating color="black" value={5} />);
    cy.get("#rating")
      .find("div")
      .find("div")
      .should("have.css", "color", "rgb(0, 0, 0)");
  });

  it("Hover interaction", () => {
    cy.mount(<Rating touchable />);

    cy.get("#rating").find("div").last().trigger("pointerenter");
    cy.get("#rating").find("div").should("have.css", "opacity", "0.5");

    cy.get("#rating").find("div").last().trigger("pointerleave");
    cy.get("#rating").find("div").should("have.css", "opacity", "1");
  });

  it("Change value", () => {
    cy.mount(<Rating touchable color="red" />);

    cy.get("#rating").find("div").last().click();
    cy.get("#rating")
      .find("div")
      .find("div")
      .should("have.css", "color", "rgb(255, 0, 0)");

    cy.get("#rating").find("div").first().click();
    cy.get("#rating")
      .find("div")
      .find("div")
      .each((el: any, index) => {
        if (index) {
          cy.get(el).should("not.have.css", "color", "rgb(255, 0, 0)");
        } else {
          cy.get(el).should("have.css", "color", "rgb(255, 0, 0)");
        }
      });
  });

  it("Disabled", () => {
    cy.mount(<Rating touchable={false} />);

    cy.get("#rating").find("div").should("have.css", "pointer-events", "none");
  });
});

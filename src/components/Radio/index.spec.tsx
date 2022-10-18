import React from "react";
import { Radio } from "./index";

describe("Radio", () => {
  it("Color & Contrast", () => {
    cy.mount(<Radio color="white" value />);
    cy.get("#radio").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("#radio")
      .find("div")
      .should("have.css", "background-color", "rgb(0, 0, 0)");

    cy.mount(<Radio color="black" value />);
    cy.get("#radio").should("have.css", "background-color", "rgb(0, 0, 0)");
    cy.get("#radio")
      .find("div")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
  });

  it("Hover interaction", () => {
    cy.mount(<Radio />);

    cy.get("#radio")
      .trigger("pointerenter")
      .find("div")
      .should("have.css", "opacity", "0");
    cy.get("#radio")
      .trigger("pointerleave")
      .find("div")
      .should("have.css", "opacity", "0.5");
  });

  it("Change value", () => {
    cy.mount(<Radio />);
    cy.get("input").should("have.value", "false");

    cy.get("#radio").click();
    cy.get("input").should("have.value", "true");
  });

  it("Disabled", () => {
    cy.mount(<Radio disabled />);
    cy.get("input").should("be.disabled");

    cy.get("#radio").should("have.css", "pointer-events", "none");
  });
});

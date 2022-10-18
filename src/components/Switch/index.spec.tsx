import React from "react";
import { Switch } from "./index";

describe("Switch", () => {
  it("Hover interaction", () => {
    cy.mount(<Switch />);

    cy.get("#switch")
      .trigger("pointerenter")
      .find("div")
      .should("have.css", "opacity", "1");
    cy.get("#switch")
      .trigger("pointerleave")
      .find("div")
      .should("have.css", "opacity", "0.5");
  });

  it("Change value", () => {
    cy.mount(<Switch />);
    cy.get("input").should("have.value", "false");

    cy.get("#switch").click();
    cy.get("input").should("have.value", "true");
  });

  it("Disabled", () => {
    cy.mount(<Switch disabled />);
    cy.get("input").should("be.disabled");

    cy.get("#switch").should("have.css", "pointer-events", "none");
  });
});

import React from "react";
import { Checkbox } from "./index";

describe("Checkbox", () => {
  it("Color & Contrast", () => {
    cy.mount(<Checkbox color="white" value />);
    cy.get("#checkbox").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("#checkbox").find("div").should("have.css", "color", "rgb(0, 0, 0)");

    cy.mount(<Checkbox color="black" value />);
    cy.get("#checkbox").should("have.css", "background-color", "rgb(0, 0, 0)");
    cy.get("#checkbox")
      .find("div")
      .should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Hover interaction", () => {
    cy.mount(<Checkbox />);

    cy.get("#checkbox")
      .trigger("pointerenter")
      .find("div")
      .should("have.css", "opacity", "0");
    cy.get("#checkbox")
      .trigger("pointerleave")
      .find("div")
      .should("have.css", "opacity", "0.5");
  });

  it("Change value", () => {
    cy.mount(<Checkbox />);
    cy.get("input").should("have.value", "false");

    cy.get("#checkbox").click();
    cy.get("input").should("have.value", "true");
  });

  it("Disabled", () => {
    cy.mount(<Checkbox disabled />);
    cy.get("input").should("be.disabled");

    cy.get("#checkbox").should("have.css", "pointer-events", "none");
  });
});

import React from "react";
import { CardContent } from "./CardContent";
import { Card } from "./index";

describe("Card", () => {
  it("Variant Card", () => {
    cy.mount(
      <Card variant="blank">
        <CardContent>Test</CardContent>
      </Card>
    );

    cy.get("#card").should("have.css", "border-radius");
    cy.get("#card").should("have.css", "background-color");
  });

  it("Variant Outlined", () => {
    cy.mount(
      <Card variant="outlined">
        <CardContent>Test</CardContent>
      </Card>
    );

    cy.get("#card").should("have.css", "border-radius");
    cy.get("#card").should("have.css", "background-color");
    cy.get("#card").should("have.css", "border-width", "2px");
    cy.get("#card").should("have.css", "border-color");
  });

  it("Variant Elevation", () => {
    cy.mount(
      <Card variant="elevation">
        <CardContent>Test</CardContent>
      </Card>
    );

    cy.get("#card").should("have.css", "border-radius");
    cy.get("#card").should("have.css", "background-color");
    cy.get("#card").should("have.css", "box-shadow");
  });

  it("Square", () => {
    cy.mount(
      <Card variant="elevation" square>
        <CardContent>Test</CardContent>
      </Card>
    );

    cy.get("#card").should("have.css", "border-radius", "0px");
  });
});

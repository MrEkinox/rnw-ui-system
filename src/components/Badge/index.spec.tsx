import React from "react";
import { Badge } from "./index";

describe("Badge", () => {
  it("No children", () => {
    cy.mount(<Badge />);
    cy.get("#badge").children().should("have.length", 0);
  });

  it("Color & Contraste", () => {
    cy.mount(<Badge color="white">Yannis</Badge>);
    cy.get("#badge").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("#badge").find("div").should("have.css", "color", "rgb(0, 0, 0)");

    cy.mount(<Badge color="black">Yannis</Badge>);
    cy.get("#badge").should("have.css", "background-color", "rgb(0, 0, 0)");
    cy.get("#badge")
      .find("div")
      .should("have.css", "color", "rgb(255, 255, 255)");
  });
});

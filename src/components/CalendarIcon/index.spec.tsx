import moment from "moment";
import React from "react";
import { CalendarIcon } from "./index";

describe("CalendarIcon", () => {
  it("Color & Contrast", () => {
    cy.mount(<CalendarIcon color="white" />);
    cy.get("#calendarIcon")
      .children()
      .first()
      .should("have.css", "color", "rgb(0, 0, 0)");
    cy.get("#calendarIcon")
      .find("div")
      .find("div")
      .should("have.css", "color", "rgb(0, 0, 0)");
    cy.get("#calendarIcon")
      .children()
      .first()
      .should("have.css", "background-color", "rgb(255, 255, 255)");

    cy.mount(<CalendarIcon color="black" />);
    cy.get("#calendarIcon")
      .children()
      .first()
      .should("have.css", "color", "rgb(255, 255, 255)");
    cy.get("#calendarIcon")
      .find("div")
      .find("div")
      .should("have.css", "color", "rgb(0, 0, 0)");
    cy.get("#calendarIcon")
      .children()
      .first()
      .should("have.css", "background-color", "rgb(0, 0, 0)");
  });

  it("Variant Rounded", () => {
    cy.mount(<CalendarIcon variant="rounded" />);
    cy.get("#calendarIcon").should("have.css", "border-radius");
    cy.get("#calendarIcon").should("not.have.css", "border-radius", "900px");
    cy.get("#calendarIcon").should("not.have.css", "border-radius", "0px");
  });

  it("Variant Square", () => {
    cy.mount(<CalendarIcon variant="square" />);
    cy.get("#calendarIcon").should("have.css", "border-radius", "0px");
  });

  it("Variant Circle", () => {
    cy.mount(<CalendarIcon variant="circular" />);
    cy.get("#calendarIcon").should("have.css", "border-radius", "900px");
  });
});

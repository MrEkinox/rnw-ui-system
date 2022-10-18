import React from "react";
import { PhoneField } from "./index";

describe("PhoneField", () => {
  it("With inital value", () => {
    cy.mount(<PhoneField value="0623484809" />);

    cy.get("#phoneField input").should("have.value", "+33 6 23 48 48 09");
  });

  it("Check FR phone", () => {
    cy.mount(<PhoneField />);

    cy.get("#phoneField input").type("0623484809");
    cy.get("#phoneField input").should("have.value", "+33 6 23 48 48 09");
  });

  it("Change country", () => {
    cy.mount(<PhoneField value="0623484809" />);

    cy.get("#phoneField #selectCountry").click();
    cy.get("#searchCountryInput").type("Andor");
    cy.get("#ADCountry").click();
    cy.get("#phoneField input").should("have.value", "");
  });
});

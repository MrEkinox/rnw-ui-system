import React from "react";
import { Text } from "react-native";
import { CircularProgress } from "./index";

describe("CircularProgress", () => {
  it("Color", () => {
    cy.mount(<CircularProgress color="black" />);

    cy.get("#circularProgress")
      .find("path")
      .last()
      .should("have.attr", "stroke", "black");
  });

  it("With Content", () => {
    cy.mount(
      <CircularProgress>
        <Text>Content</Text>
      </CircularProgress>
    );

    cy.get("#circularProgress").should("contain.text", "Content");
  });
});

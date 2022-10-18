import { Icon } from "../Icon";
import React from "react";
import { Button } from "./index";
import ColorJS from "color";

interface CheckTriggerButtonOptions {
  style: string;
  inactive: string;
  active: string;
}

const CheckTriggerButton = ({
  active,
  inactive,
  style,
}: CheckTriggerButtonOptions) => {
  cy.get("#button").trigger("pointerenter").should("have.css", style, active);

  cy.get("#button").trigger("pointerleave").should("have.css", style, inactive);

  cy.get("#button").trigger("touchstart").should("have.css", style, active);

  cy.get("#button").trigger("touchend").should("have.css", style, inactive);
};

describe("Button", () => {
  it("Variant Outlined", () => {
    const color = "rgb(0, 0, 0)";
    cy.mount(
      <Button variant="outlined" color={color}>
        Yannis
      </Button>
    );

    cy.get("#button").should("have.css", "border-width", "2px");
    cy.get("#button").should("have.css", "border-color", color);

    CheckTriggerButton({
      style: "background-color",
      inactive: "rgba(0, 0, 0, 0)",
      active: ColorJS(color).alpha(0.3).toString(),
    });
  });

  it("Variant Hovered", () => {
    const color = "rgb(0, 0, 0)";
    cy.mount(
      <Button color={color} variant="hovered">
        Yannis
      </Button>
    );

    cy.get("#button").should("have.css", "color", color);

    CheckTriggerButton({
      style: "background-color",
      inactive: "rgba(0, 0, 0, 0)",
      active: ColorJS(color).alpha(0.3).toString(),
    });
  });

  it("Variant Text", () => {
    const color = "rgb(0, 0, 0)";
    cy.mount(
      <Button color={color} variant="text">
        Yannis
      </Button>
    );

    cy.get("#button").should("have.css", "color", color);
    cy.get("#button").should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)"
    );

    CheckTriggerButton({ style: "opacity", inactive: "1", active: "0.5" });
  });

  it("Variant Contained", () => {
    const color = "rgb(0, 0, 0)";
    cy.mount(
      <Button color={color} variant="contained">
        Yannis
      </Button>
    );

    cy.get("#button").should("have.css", "opacity", "1");

    CheckTriggerButton({
      style: "background-color",
      inactive: color,
      active: ColorJS(color).alpha(0.8).toString(),
    });
  });

  it("Size Small", () => {
    const startIcon = <Icon type="Ionicons" name="chevron-forward" />;
    const endIcon = <Icon type="Ionicons" name="chevron-back" />;
    cy.mount(
      <Button size="small" startIcon={startIcon} endIcon={endIcon}>
        Yannis
      </Button>
    );

    cy.get("#button").should("have.css", "padding-left", "10px");
    cy.get("#button").should("have.css", "padding-top", "5px");

    cy.get("#button")
      .children()
      .first()
      .should("have.css", "margin-left", "0px");
    cy.get("#button")
      .children()
      .first()
      .should("have.css", "margin-right", "5px");

    cy.get("#button")
      .children()
      .last()
      .should("have.css", "margin-left", "5px");
    cy.get("#button")
      .children()
      .last()
      .should("have.css", "margin-right", "0px");
  });

  it("Size Large", () => {
    const startIcon = <Icon type="Ionicons" name="chevron-forward" />;
    const endIcon = <Icon type="Ionicons" name="chevron-forward" />;
    cy.mount(
      <Button size="large" startIcon={startIcon} endIcon={endIcon}>
        Yannis
      </Button>
    );

    cy.get("#button").should("have.css", "padding-left", "25px");
    cy.get("#button").should("have.css", "padding-top", "15px");

    cy.get("#button")
      .children()
      .first()
      .should("have.css", "margin-left", "-5px");
    cy.get("#button")
      .children()
      .first()
      .should("have.css", "margin-right", "10px");

    cy.get("#button")
      .children()
      .last()
      .should("have.css", "margin-left", "10px");
    cy.get("#button")
      .children()
      .last()
      .should("have.css", "margin-right", "-5px");
  });

  it("Loading", () => {
    const loadingText = "Loading...";
    cy.mount(
      <Button loading loadingIndicator={loadingText} loadingPosition="start">
        Yannis
      </Button>
    );
    cy.get("#button").children().eq(0).should("contain.text", loadingText);
    cy.get("#button").children().eq(1).should("contain.text", "Yannis");

    cy.mount(
      <Button loading loadingIndicator={loadingText} loadingPosition="end">
        Yannis
      </Button>
    );
    cy.get("#button").children().eq(0).should("contain.text", "Yannis");
    cy.get("#button").children().eq(1).should("contain.text", loadingText);

    cy.mount(
      <Button loading loadingIndicator={loadingText} loadingPosition="center">
        Yannis
      </Button>
    );
    cy.get("#button").should("contain.text", loadingText);
    cy.get("#button").should("not.contain.text", "Yannis");
  });

  it("Invalid children", () => {
    const color = "rgb(0, 0, 0)";
    cy.mount(
      <Button color={color} variant="contained">
        {9778}
      </Button>
    );
    cy.get("#button").children().should("have.length", 0);
  });

  it("Color & Contraste", () => {
    const startIcon = <Icon type="Ionicons" name="chevron-forward" />;
    const endIcon = <Icon type="Ionicons" name="chevron-forward" />;

    cy.mount(
      <Button startIcon={startIcon} endIcon={endIcon} color="white">
        Yannis
      </Button>
    );
    cy.get("#button").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("#button").find("div").should("have.css", "color", "rgb(0, 0, 0)");

    cy.mount(
      <Button startIcon={startIcon} endIcon={endIcon} color="black">
        Yannis
      </Button>
    );
    cy.get("#button").should("have.css", "background-color", "rgb(0, 0, 0)");
    cy.get("#button")
      .find("div")
      .should("have.css", "color", "rgb(255, 255, 255)");
  });
});

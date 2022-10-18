import React from "react";
import { Icon } from "../Icon";
import { Avatar } from "./index";

describe("Avatar", () => {
  it("One Word", () => {
    cy.mount(<Avatar>Yannis</Avatar>);

    cy.get("#avatar").should("contain", "Y");
    cy.get("#avatar").should("not.contain", "Yannis");
  });

  it("Multiple Words", () => {
    cy.mount(<Avatar>Yannis Caussade</Avatar>);

    cy.get("#avatar").should("contain", "YC");
    cy.get("#avatar").should("not.contain", "Yannis Caussade");
  });

  it("Image", () => {
    cy.mount(
      <Avatar
        variant="rounded"
        src="https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg"
      />
    );
    cy.get("#avatar")
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://resize.elle.fr/article/var/plain_site/storage/images/loisirs/cinema/news/avatar-2-une-premiere-bande-annonce-en-mai-4010741/96462268-1-fre-FR/Avatar-2-une-premiere-bande-annonce-en-mai.jpg"
      );
  });

  it("Icon", () => {
    cy.mount(
      <Avatar>
        <Icon type="FontAwesome" name="rocket" />
      </Avatar>
    );
    cy.get("#avatar").children().should("have.length", 1);
  });

  it("Invalid children", () => {
    cy.mount(<Avatar>{9887}</Avatar>);
    cy.get("#avatar").children().should("have.length", 0);
  });

  it("Variant Rounded", () => {
    cy.mount(<Avatar variant="rounded" />);
    cy.get("#avatar").should("have.css", "border-radius");
    cy.get("#avatar").should("not.have.css", "border-radius", "900px");
    cy.get("#avatar").should("not.have.css", "border-radius", "0px");
  });

  it("Variant Square", () => {
    cy.mount(<Avatar variant="square" />);
    cy.get("#avatar").should("have.css", "border-radius", "0px");
  });

  it("Variant Circle", () => {
    cy.mount(<Avatar variant="circular" />);
    cy.get("#avatar").should("have.css", "border-radius", "900px");
  });

  it("Color & Contraste", () => {
    cy.mount(<Avatar color="white">Yannis</Avatar>);
    cy.get("#avatar").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
    cy.get("#avatar").find("div").should("have.css", "color", "rgb(0, 0, 0)");

    cy.mount(<Avatar color="black">Yannis</Avatar>);
    cy.get("#avatar").should("have.css", "background-color", "rgb(0, 0, 0)");
    cy.get("#avatar")
      .find("div")
      .should("have.css", "color", "rgb(255, 255, 255)");
  });
});

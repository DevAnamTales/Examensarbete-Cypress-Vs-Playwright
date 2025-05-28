import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
When('user click on the {string} button', (btnText) => {
  cy.contains('button', btnText, { matchCase: false }).first().click();
});

Then('the product is added to cart', () => {
  cy.get('button[aria-haspopup="dialog"]').eq(1).click();
  cy.contains('banan').should('be.visible');
});
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
When('the user searches for the product {string}', (productName) => {
  cy.get('[data-testid="search-input"]')
    .type(`${productName}{enter}`);
});

Then('user should see search results', () => {
  cy.get('ul[role="list"].Grid.Grid-items').should('be.visible');
  cy.get('ul[role="list"] > li').should('have.length.greaterThan', 0);
});
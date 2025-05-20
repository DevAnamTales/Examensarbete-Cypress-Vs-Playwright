import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user visits the Coop homepage", () => {
  // Visit the homepage
  cy.visit('https://www.coop.se');

  // Wait for cookie dialog and click accept button inside it
  cy.get('#cmpbox', { timeout: 10000 }).should('be.visible').within(() => {
    cy.get('a.cmpboxbtnyes')
      .should('contain.text', 'Acceptera alla cookies')
      .click({ force: true });
  });
});



Then("the page title should contain {string}", (title) => {
  //cy.title().should("include", title);
  cy.wait(2000)
  cy.url({ timeout: 10000 }).should('include', title)

});

Given('user clicks on the {string} button', (loginButton) => {
  //cy.contains('button', buttonText).click();
  cy.get('a[href*="/default-login"]')
    .should('be.visible')
    .and('contain', loginButton)
    .click();
});

Given('user chooses the {string} option', (optionText) => {
  cy.origin('https://login.coop.se', { args: { optionText } }, ({ optionText }) => {
    cy.url().should('include', '/logga-in');
    cy.contains('button', optionText).should('be.visible').click();
  });
});

Given('user enters the {string} and {string}', (email, password) => {
  cy.origin('https://login.coop.se', { args: { email, password } }, ({ email, password }) => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
  });
});


When('user clicks on {string} button', (buttonText) => {
  cy.origin('https://login.coop.se', { args: { buttonText } }, ({ buttonText }) => {
    cy.get('button[type="submit"]').contains(buttonText).click();
  });
});


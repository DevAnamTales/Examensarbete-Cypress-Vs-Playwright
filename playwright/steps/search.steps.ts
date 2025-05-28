import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world'; // adjust the path if needed

Given('the user searches for the product {string}', async function (this: CustomWorld, searchTerm: string) {
  const searchInput = this.page.locator('input[data-testid="search-input"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill(searchTerm);
  await searchInput.press('Enter');
});

Then('user should see search results', async function (this: CustomWorld) {
  const resultsList = this.page.locator('ul[role="list"].Grid.Grid-items').first();
  await expect(resultsList).toBeVisible();
  
});
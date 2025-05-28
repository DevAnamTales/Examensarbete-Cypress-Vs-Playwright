import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world'; // adjust path if needed

When('user click on the {string} button', async function (this: CustomWorld, btnText: string) {
  const button = this.page.locator('button', { hasText: btnText });
  await button.first().click();
});

Then('the product is added to cart', async function (this: CustomWorld) {
  const bananElement = this.page.locator('text=banan').first();
  await expect(bananElement).toBeVisible();
});

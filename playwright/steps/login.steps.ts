import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

import * as dotenv from 'dotenv';
dotenv.config();

const email = process.env.coopEmail;
const password = process.env.coopPassword;

Given('the user visits the Coop homepage', async function (this: CustomWorld) {
  await this.page.goto('https://www.coop.se');
  await this.page.waitForLoadState('domcontentloaded');

  const cookieAcceptBtn = this.page.locator('a.cmpboxbtnyes');
  if (await cookieAcceptBtn.isVisible()) {
    await cookieAcceptBtn.click();
  }
});

Then('the page title should contain {string}', async function (this: CustomWorld, partialUrl: string) {
  await this.page.waitForTimeout(2000);
  const currentUrl = this.page.url();
  expect(currentUrl).toContain(partialUrl);
});

Given('user clicks on the {string} button', async function (this: CustomWorld, loginButton: string) {
  const button = this.page.locator('a[href*="/default-login"]', { hasText: loginButton });
  await expect(button).toBeVisible();
  await button.click();
});

Given('the user enters login credentials', async function () {
  // Assuming 'page' is available in the World/context
  //await this.page.goto('https://login.coop.se');

  await this.page.fill('input[type="email"]', email);
  await this.page.fill('input[type="password"]', password);
});


Given('user chooses the {string} option', async function (this: CustomWorld, optionText: string) {
  await this.page.waitForURL(/login\.coop\.se/);
  const option = this.page.locator(`button:has-text("${optionText}")`);
  await expect(option).toBeVisible();
  await option.click();
});

Given('user enters the {string} and {string}', async function (this: CustomWorld, email: string, password: string) {
  const emailInput = this.page.locator('input[type="email"]');
  const passwordInput = this.page.locator('input[type="password"]');

  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);

  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(password);
});

When('user clicks on {string} button', async function (this: CustomWorld, buttonText: string) {
  const submitButton = this.page.locator('button[type="submit"]', { hasText: buttonText });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
});

Given('the user is logged in', { timeout: 30000 }, async function (this: CustomWorld) {

  if (!email || !password) {
    throw new Error('Missing coopEmail or coopPassword in environment variables');
  }

  // Visit Coop homepage
  await this.page.goto('https://www.coop.se');
  await this.page.waitForLoadState('domcontentloaded');

  // Accept cookies if shown
  const cookieBtn = this.page.locator('a.cmpboxbtnyes');
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
  }

  // Click "Logga in" button
  const loginLink = this.page.locator('a[href*="/default-login"]', { hasText: 'Logga in' });
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  // Wait for redirect to login page
  await this.page.waitForURL(/login\.coop\.se/);

  // Click "Med e-post"
  const emailLoginBtn = this.page.locator('button', { hasText: 'Med e-post' });
  await expect(emailLoginBtn).toBeVisible();
  await emailLoginBtn.click();

  // Fill in email and password
  const emailInput = this.page.locator('input[type="email"]');
  const passwordInput = this.page.locator('input[type="password"]');
  await emailInput.fill(email);
  await passwordInput.fill(password);

  // Submit the form
  const submitBtn = this.page.locator('button[type="submit"]');
  await submitBtn.click();

  // Optional: wait for login to complete, e.g., by checking the home page
  //await this.page.waitForURL('https://www.coop.se/');
});

import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from 'playwright';
import { expect } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000); // Avoid step timeouts

// Open Coop homepage
Given('the user visits the Coop homepage', async () => {
  browser = await chromium.launch({ headless: false }); // headless: true for CI
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://www.coop.se');
  await page.waitForLoadState('domcontentloaded');

  // Accept cookies
  const cookieAcceptBtn = page.locator('a.cmpboxbtnyes');
  if (await cookieAcceptBtn.isVisible()) {
    await cookieAcceptBtn.click();
  }
});

// Check page title contains string
Then('the page title should contain {string}', async (partialUrl: string) => {
  await page.waitForTimeout(2000);
  const currentUrl = page.url();
  expect(currentUrl).toContain(partialUrl);
});

// Click a button by text
Given('user clicks on the {string} button', async (loginButton: string) => {
  const button = page.locator('a[href*="/default-login"]', { hasText: loginButton });
  await expect(button).toBeVisible();
  await button.click();
});

// Choose an option like "Privat" on login.coop.se
Given('user chooses the {string} option', async (optionText: string) => {
  await page.waitForURL(/login\.coop\.se/);
  const option = page.locator(`button:has-text("${optionText}")`);
  await expect(option).toBeVisible();
  await option.click();
});

// Enter email and password
Given('user enters the {string} and {string}', async (email: string, password: string) => {
  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');

  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);

  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(password);
});

// Submit login form
When('user clicks on {string} button', async (buttonText: string) => {
  const submitButton = page.locator('button[type="submit"]', { hasText: buttonText });
  await expect(submitButton).toBeVisible();
  await submitButton.click();
});
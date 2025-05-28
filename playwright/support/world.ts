import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({ headless: true });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Navigate to base URL before clearing cookies (workaround)
    await this.page.goto('https://www.coop.se');
    await this.context.clearCookies();
  }

  async close() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

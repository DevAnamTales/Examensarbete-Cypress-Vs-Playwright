import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

setDefaultTimeout(30 * 1000); // 30 seconds globally

Before(async function (this: CustomWorld) {
  await this.init();
  await this.context.clearCookies();

});

After(async function (this: CustomWorld) {
  await this.close();
});

import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

setDefaultTimeout(30 * 1000); // 30 seconds globally

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
  await this.close();
});

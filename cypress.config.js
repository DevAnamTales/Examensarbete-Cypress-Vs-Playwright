import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import preprocessor from '@badeball/cypress-cucumber-preprocessor';
dotenv.config();

export default defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
    baseUrl: 'https://www.coop.se',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  env: {
      coopEmail: process.env.coopEmail,
      coopPassword: process.env.coopPassword,
    },
  },
});

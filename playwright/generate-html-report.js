const path = require('path');
const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, 'reports', 'cucumber_report.json'),
  output: path.join(__dirname, 'reports', 'cucumber_report.html'),
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome",
    "Platform": "Windows 11",
    "Executed": "Local"
  }
};

reporter.generate(options);

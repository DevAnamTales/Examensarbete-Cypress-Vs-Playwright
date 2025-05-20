module.exports = {
  default: {
    require: ["step_definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["html:cucumber-report.html"],
    paths: ["features/**/*.feature"],
    parallel: 1,
    timeout: 60000
  },
};

module.exports = function () {
  return {
    testFramework: {
      configFile: './vitest.dom.config.ts',
    },
    hints: {
      ignoreCoverageForFile: /Wallaby ignore file coverage/,
      ignoreCoverage: /Wallaby ignore coverage/,
    },
    trace: true,
  };
};

const baseConfig = require('../../jest.config.base');

module.exports = {
  ...baseConfig,
  displayName: 'profile',
  testRegex: '.*\\.spec2\\.ts$',
};

const { resolve } = require('path');
const baseConfig = require('./jest.config.base');
const { lstatSync, readdirSync } = require('fs');

// We exclude web package because it uses its own
// jest configuration under react-testing-library.
const basePath = resolve(__dirname, 'packages');
const packages = readdirSync(basePath).filter(
  (name) => name !== 'web' && lstatSync(resolve(basePath, name)).isDirectory(),
);
console.log(packages);

module.exports = {
  ...baseConfig,
  projects: packages.map((name) => `<rootDir>/packages/${name}`),
};

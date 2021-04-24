const path = require('path');
const common = require('./jest.config.base');
const { lstatSync, readdirSync } = require('fs');

// We exclude web package because it uses its own
// jest configuration under react-testing-library.
const basePath = path.resolve(__dirname, 'packages');
const packages = readdirSync(basePath).filter(
  (name) =>
    name !== 'web' && lstatSync(path.join(basePath, name)).isDirectory(),
);

module.exports = {
  ...common,
  roots: packages.map((name) => `<rootDir>/packages/${name}`),
};

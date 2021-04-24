Monorepo Setup Steps
- We will be using yarn 2 in our monorepo
  - If you don't have yarn or want to upgrade yarn to the latest verison, run `npm install -g yarn`
    - This will still install yarn 1, because yarn 2 is only meant to be used on a per-project basis
  - cd to your project dir, and inside that run `yarn set version berry` to use yarn2 in your project
  - `yarn init`
  - Add this to the root `package.json` to use yarn workspaces
  `"workspaces": [
    "packages/*"
  ],`
  - Set the attribute `private` to true because yarn workspaces are not supposed to be published.


- Minimum dependencies required in the root repository
  - @nestjs/cli
  - typescript
  - eslint
  - eslint-config-prettier (to make eslint work nicely with prettier)
  - eslint-plugin-prettier (to make eslint work nicely with prettier)
  - prettier
  - husky (for pre-commit linting + formatting)
  - lint-staged (for running husky pre-commit hook only on staged files)
  - jest
  - @types/jest (required because we might want to run tests on the whole repo)
  - ts-jest (since our jest tests are also in typescript, we need this to perform on-the-fly compilation of test files before running)
  - rimraf (cross-platform removal tool, think `rm -rf` but can be used on Windows)


- How to create a new package "abc"
  - `cd packages`
  - `mkdir abc && cd abc`
  - `yarn init`
  - Rename the default name in package.json `abc` to `@tinyhouse/abc`. This doesn't have any real effect, apart from making
  it more explicit that the package belongs to our mono-repo namespace
  - Install minimum required dev dependencies for each package
    - @nestjs/schematics (TODO: this seems to only needed to be installed at the root since its only purpose is for scaffolding nest files, however without it being installed in each workspace `nest generate` will fail)
    - @nestjs/testing
    - @types/jest
    - supertest (for e2e testing)
    - @types/supertest
    - ts-jest (TODO: another tool that seems to only needed to be installed at the root, but without it being installed in each workspace jest will fail to run tests)
  - We need a `tsconfig.json` extending the base `tsconfig.json` that specifies the what files to be included/excluded in the build process. Normally, we should exclude the `.spec.ts` files (test files) from the build output.
    - `tsconfig.json` can also set up project references to point to some other workspaces that it requires to be built before it's being built (basically cross-workspace dependencies). When we build this package we need to use `tsc -b .` which will build the references as well if they have not been built.
      - The references (libraries) have to have `composite: true` and `declaration:true` (implicitly set if composite is true), which will generate the declaration files `.d.ts` to allow dependent packages to import the library's exported objects without missing the type declaration.
    - As a result, we need another file `tsconfig.lint.json` which is pointed to by `.eslintrc.js` to include the test files for typescript-eslint type checking, otherwise typescript-eslint will complain that it cannot resolve the syntax in the test files since they are not included in the project if we use `tsconfig.json`
  - We also need a `jest.config.js` which simply imports and then re-exports the root `jest.config.base.js` so the jest test runner knows how to run the tests contained in this package.


  - Notice that we don't install binaries like `jest`, `rimraf`, `typescript`, `eslint`, `prettier` or `@nestjs/cli` in each workspace because we will be running all the life-cycle scripts referencing the binaries installed in the root. How do we do this?
    - Yarn2 has a mechanism that allow us to call a script defined in the root by naming the script with a colon `:`,
    for example `workspace:build`
    - When defining the script, Yarn2 provides a way to get the directory from which the script was invoked, denoted by $INIT_CWD
      => our `workspace:build` could look like this: `cd $INIT_CWD && tsc -b .` which will build whatever workspace from which we invoke this script.
    - To reference the root-level script from the workspace, we use `yarn workspace:build`.
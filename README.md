# Prettier Setup

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Maintainability](https://api.codeclimate.com/v1/badges/d11a308db752d4b202bf/maintainability)](https://codeclimate.com/github/MarvinJWendt/prettier-setup/maintainability)

> Set up [Prettier](https://prettier.io/) for your JavaScript and TypeScript projects with one command.

## Install with NPM

> This will install the NPM module globally.

```console
npm i -g prettier-setup
```

_That´s it!_

## Usage

Open a terminal in the root directory of your project. Type:

```console
prettier-setup
```

.. and press return.

Choose a code language that you want to use and hit return (use arrow keys to select).

_The setup will now install Prettier with ESLint support._

The setup will automatically create NPM scripts for you.  
You can now use:

- `npm run format` This will format every supported file.
- `npm run formatjs` This will only format \*.js files.

If you selected TypeScript you can also use:

- `npm run formatts` This will only format **\*.ts** files.
- `npm run compile` This will run the TypeScriptCompiler _(tsc)_ and format the

## Usage (JavaScript)

Open a terminal in the root directory of your project. Type:

```console
prettier-setup -js
```

or

```console
prettier-setup --javascript
```

.. and press return.  
_The setup will now install Prettier with ESLint support._

The setup will automatically create NPM scripts for you.  
You can now use:

- `npm run format` This will format every supported file.
- `npm run formatjs` This will only format \*.js files.

## Usage (JavaScript & TypeScript)

Open a terminal in the root directory of your project. Type:

```console
prettier-setup -ts
```

or

```console
prettier-setup --typescript
```

.. and press return.  
_The setup will now install Prettier with ESLint and TSLint support._

The setup will automatically create NPM scripts for you.  
You can now use:

- `npm run format` This will format every supported file.
- `npm run formatjs` This will only format **\*.js** files.
- `npm run formatts` This will only format **\*.ts** files.
- `npm run compile` This will run the TypeScriptCompiler _(tsc)_ and format the generated \*.js files afterwards.

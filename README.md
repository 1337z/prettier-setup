# prettier-setup

> Set up [Prettier](https://prettier.io/) for your JavaScript and TypeScript projects with one command.

## Install with NPM

> This will install the module globally.

    npm i -g prettier-setup

That´s it!

## Usage (JavaScript)

Open a terminal in the root directory of your project. Type:

    prettier-setup

.. and press return.  
_The setup will now install Prettier with ESLint support._

The setup will automatically create NPM scripts for you.  
You can now use:

`npm run format` This will format every supported file.  
`npm run formatjs` This will only format \*.js files.

## Usage (JavaScript & TypeScript)

Open a terminal in the root directory of your project. Type:

    prettier-setup -ts

or

    prettier-setup --typescript

.. and press return.  
_The setup will now install Prettier with ESLint and TSLint support._

The setup will automatically create NPM scripts for you.  
You can now use:

`npm run format` This will format every supported file.  
`npm run formatjs` This will only format **\*.js** files.  
`npm run formatts` This will only format **\*.ts** files.  
`npm run compile` This will run the TypeScriptCompiler _(tsc)_ and format the generated \*.js files afterwards.

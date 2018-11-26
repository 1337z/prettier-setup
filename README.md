# prettier-setup
Setup [Prettier](https://prettier.io/) for your JavaScript and TypeScript projects with one command.

## Install with NPM

    npm i -g prettier-setup
That´s it!

## Usage (JavaScript)
Open a terminal in the root directory of your project. Type:

    prettier-setup
.. and press return.
The setup will now install Prettier with ESLint support.

The setup will automatically create NPM scripts for you. You can now use:

`npm run format` This will format every supported file.  
`npm run formatjs` This will only format *.js files.

## Usage (JavaScript & TypeScript)
Open a terminal in the root directory of your project. Type:

    prettier-setup -ts
or

    prettier-setup --typescript

.. and press return.
The setup will now install Prettier with ESLint and TSLint support.

The setup will automatically create NPM scripts for you. You can now use:

`npm run format` This will format every supported file.  
`npm run formatjs` This will only format *.js files.  
`npm run formatts` This will only format *.ts files.  
`npm run compile` This will run the TypeScriptCompiler (tsc) and format the generated *.js files afterwards.
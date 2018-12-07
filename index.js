// Imports
const exec = require('child_process').exec
const jsonfile = require('jsonfile')
const fs = require('fs')
const inquirer = require('inquirer')

// Setup commands
const installJS = 'npm i -D prettier eslint eslint-plugin-prettier'
const installTS = 'npm i -D prettier eslint eslint-plugin-prettier tslint tslint-plugin-prettier'

// Setup function as export
exports.setup = args => {

  // Check if args exists
  if (args[0] == undefined || args[0] == null || args[0] == '') {

    // Show interactive questions
    showSurvey()
  } else {

    // Use args
    if (args[0] == '--typescript' || args[0] == '-ts') {

      // Execute TypeScript command
      installTypeScript()

      // If args are not setting the language to TypeScript
      // check if it's set to JavaScript
    } else if (args[0] == '--javascript' || args[0] == '-js') {

      // Execute JavaScript command
      installJavaScript()

      // Args not matching
    } else {

      // Show notice for acceptable args
      console.log('Only [-js | --javascript | -ts | --typescript] are valid arguments!')

      // Show interactive questions
      showSurvey()
    }
  }
}

/**
 * @description Show interactive questions
 */
function showSurvey() {
  inquirer
    .prompt({
      type: 'list',
      name: 'type',
      message: 'Please select which language you are using.',
      choices: ['JavaScript', 'TypeScript']
    })
    .then(answers => {
      if (answers.type == 'JavaScript') {
        installJavaScript()
      } else if (answers.type == 'TypeScript') {
        installTypeScript()
      } else {
        console.log('Error!')
      }
    })
    .catch(err => {
      if (err) throw err
    })
}

function installJavaScript() {
  console.log('Setup will install prettier and javascript dependencies.')

  // Execute JavaScript command
  exec(installJS, err => {

    // Check for errors
    if (err) throw err

    // Add JavaScript npm scripts
    addScript({
      key: 'format',
      value: './node_modules/.bin/prettier --write **/*'
    })
    addScript({
      key: 'formatjs',
      value: './node_modules/.bin/prettier --write **/*.js'
    })
  })

  // Copy JavaScript template files
  console.log('Creating template files..')
  copyTemplateFiles()
  console.log('Finished!')
  console.log('Edit the `.prettierrc` file to change the format styling.')
}

function installTypeScript() {
  console.log('Setup will install prettier, typescript and javascript dependencies.')

  // Execute TypeScript command
  exec(installTS, err => {

    // Check for errors
    if (err) throw err

    // Add TypeScript and JavaScript npm scripts
    addScript({
      key: 'format',
      value: './node_modules/.bin/prettier --write **/*'
    })
    addScript({
      key: 'formatjs',
      value: './node_modules/.bin/prettier --write **/*.js'
    })
    addScript({
      key: 'formatts',
      value: './node_modules/.bin/prettier --write **/*.ts'
    })
    addScript({
      key: 'compile',
      value: 'tsc && npm run formatjs'
    })
  })

  // Copy TypeScript template files
  console.log('Creating template files..')
  copyTemplateFiles(true)
  console.log('Finished!')
  console.log('Edit the `.prettierrc` file to change the format styling.')
}

/**
 *
 * @param {boolean} typescript
 */
function copyTemplateFiles(typescript = false) {
  copyTemplate('.eslintrc')
  copyTemplate('.prettierrc')

  // If `typescript` is true it will also copy the tslint.json file
  if (typescript) copyTemplate('tslint.json')
}

/**
 *
 * @param {string} filename
 */
function copyTemplate(filename) {
  const path = __dirname + '/template/' + filename

  fs.copyFile(path, './' + filename, err => {
    if (err) throw err
  })
}

/**
 *
 * @param {string} script
 */
function addScript(script) {
  try {
    // package.json file
    let packageJSON = jsonfile.readFileSync('package.json')

    // Error checks
    if (!packageJSON.scripts) packageJSON.scripts = {}
    if (!script.force && packageJSON.scripts[script.key]) {
      console.log('That script already exists!')
      console.log('Skipping..')
    }

    // Add scripts
    packageJSON.scripts[script.key] = script.value

    // Rewrite file
    jsonfile.writeFileSync('package.json', packageJSON, {
      spaces: 2
    })
  } catch (e) {
    if (e.message === "ENOENT, no such file or directory 'package.json'") {
      console.log('Cannot find a `package.json`. Are you in a Node project folder?')
    } else {
      throw e
    }
  }
}

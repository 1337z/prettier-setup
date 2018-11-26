const exec = require('child_process').exec
const jsonfile = require('jsonfile')
var fs = require('fs');

const installJS = 'npm i -D prettier eslint eslint-plugin-prettier'
const installTS = 'npm i -D prettier eslint eslint-plugin-prettier tslint tslint-plugin-prettier'

exports.setup = args => {
  if (args[0] == '--typescript' || args[0] == '-ts') {
    console.log('Setup will install prettier, typescript and javascript dependencies.')

    exec(installTS, err => {
      if (err) throw err
      addScript({
        key: 'format',
        value: './node_modules/.bin/prettier --write *'
      })
      addScript({
        key: 'formatjs',
        value: './node_modules/.bin/prettier --write *.js'
      })
      addScript({
        key: 'formatts',
        value: './node_modules/.bin/prettier --write *.ts'
      })
      addScript({
        key: 'compile',
        value: 'tsc && npm run formatjs'
      })
    })

    copyTemplateFiles()

  } else {
    console.log('Setup will install prettier and javascript dependencies.')
    exec(installJS, err => {
      if (err) throw err
      addScript({
        key: 'format',
        value: './node_modules/.bin/prettier --write *'
      })
      addScript({
        key: 'formatjs',
        value: './node_modules/.bin/prettier --write *.js'
      })
    })

    copyTemplateFiles()

  }

}

function copyTemplateFiles(typescript = false) {
  copyTemplate('.eslintrc')
  copyTemplate('.prettierrc')
  if (typescript) copyTemplate('tslint.json')
}

function copyTemplate(filename) {
  const path = __dirname + "/template/" + filename

  fs.copyFile(path, './' + filename, (err) => {
    if (err) throw err;

  })
}

function addScript(script) {
  try {
    let packageJSON = jsonfile.readFileSync('package.json')

    if (!packageJSON.scripts) packageJSON.scripts = {}
    if (!script.force && packageJSON.scripts[script.key]) {
      console.log('That script already exists!')
      console.log('Skipping..')
    }

    packageJSON.scripts[script.key] = script.value
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
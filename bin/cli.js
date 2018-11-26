#!/usr/bin/env node

const index = require('../index.js')

let args = process.argv.splice(process.execArgv.length + 2)

index.setup(args)

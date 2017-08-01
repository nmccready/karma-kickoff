'use strict'
const argv = require('yargs').argv
const kickoff = require('./index')
const fs = require('graceful-fs')

let configFile = argv.config
let appendFiles = argv.files
let lengthToPop = argv.lengthToPop
let singleRun = argv.singleRun
let autoWatch = argv.autoWatch
let browsers = argv.browsers

function getFilePath(fileName) {
  return process.cwd() + '/' + fileName
}

let filePath

if (!configFile) {
  // default config file (if exists)
  if (fs.existsSync(filePath = getFilePath('karma.conf.js'))) {
    configFile = filePath
  } else if (fs.existsSync(filePath = getFilePath('karma.conf.coffee'))) {
    configFile = filePath
  } else if (fs.existsSync(filePath = getFilePath('.config/karma.conf.js'))) {
    configFile = filePath
  } else if (fs.existsSync(filePath = getFilePath('.config/karma.conf.coffee'))) {
    configFile = filePath
  }
}

let opts = {
  configFile: configFile,
  appendFiles: appendFiles,
  lengthToPop: lengthToPop ? parseInt(lengthToPop) : null,
  singleRun: singleRun ? singleRun == 'true' : null
}

if(browsers != null)
  opts.browsers = browsers.split(',')

if(browsers != null)
  opts.autoWatch = autoWatch == 'true'

kickoff((code) => {
  process.exit(code)
}, opts)

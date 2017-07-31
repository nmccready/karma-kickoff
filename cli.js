'use strict'
const argv = require('yargs').argv
const kickoff = require('./index')
const fs = require('graceful-fs')

var configFile = argv.config
var appendFiles = argv.files
var lengthToPop = argv.lengthToPop
var singleRun = argv.singleRun

function getFilePath(fileName) {
  return process.cwd() + '/' + fileName
}

var filePath

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

kickoff((code) => {
  process.exit(code)
}, {
  configFile: configFile,
  appendFiles: appendFiles,
  lengthToPop: lengthToPop ? parseInt(lengthToPop) : null,
  singleRun: singleRun ? singleRun == 'true' : null
})

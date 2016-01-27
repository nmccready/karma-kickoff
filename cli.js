'use strict'
const argv = require('yargs').argv
const kickoff = require('./index')
const fs = require('graceful-fs')

var configFile = argv.config
var appendFiles = argv.files

if (!configFile) {
  // default config file (if exists)
  if (fs.existsSync('./karma.conf.js')) {
    configFile = './karma.conf.js'
  } else if (fs.existsSync('./karma.conf.coffee')) {
    configFile = './karma.conf.coffee'
  } else if (fs.existsSync('./.config/karma.conf.js')) {
    configFile = './.config/karma.conf.js'
  } else if (fs.existsSync('./.config/karma.conf.coffee')) {
    configFile = './.config/karma.conf.coffee'
  }
}

kickoff((code) => {
  process.exit(code)
}, {
  configFile: configFile,
  appendFiles: appendFiles
})

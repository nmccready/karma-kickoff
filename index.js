'use strict'

var Karma = require('karma').Server
const _ = require('lodash')

let getOriginalConfig = (configFile, logFn) => {
  let confFactory = require(configFile)
  let genConfig = null
  let setConfig = function(config) {
    logFn('getting original Karma config')
    return genConfig = config
  }
  confFactory({set: setConfig})
  return genConfig
}

const ourOptions = ['logFn', 'appendFiles', 'lengthToPop']

module.exports = (done, opts) => {
  /*eslint-disable no-alert, no-console */
  opts = opts || {}
  let configFile = opts.configFile
  let appendFiles = opts.appendFiles
  let lengthToPop = opts.lengthToPop || 1
  let logFn = opts.logFn || console.log

  if (!configFile)
    throw new Error('configFile must be defined')

  opts.singleRun = opts.singleRun || true
  ourOptions.forEach((name) => {
    if (opts[name])
      delete opts[name]
  })

  if (typeof configFile === 'string')
    opts.configFile = require.resolve(configFile)

  if (appendFiles) {
    let copy = _.extend({}, getOriginalConfig(configFile, logFn))

    for (let i = 0; i < lengthToPop; i++)
      copy.files.pop()

    opts.files = copy.files.concat(appendFiles)
  }

  logFn('-- Karma Setup --')
  try {
    let server = new Karma(opts, function(code) {
      logFn(`Karma Callback Code: ${code}`)
      return done.apply(null,arguments)
    })
    return server.start()
  } catch (error) {
    logFn(`KARMA ERROR: ${error}`)
    return done(error)
  }
}

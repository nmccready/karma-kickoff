'use strict'
/*eslint-env mocha*/
/*eslint-disable no-console */

require('chai').should()
const sinon = require('sinon')
const rewire = require('rewire')
const subject = rewire('../index')

var karmaStub = null

class KarmaMockClass {
  constructor() {
    karmaStub.apply(null, arguments)
  }
  start() {}

}

describe('karam-kickoff', () => {
  beforeEach(() => {
    karmaStub = sinon.stub()
    subject.__set__('Karma', KarmaMockClass)
  })

  it('exists', () => {
    subject.should.be.ok
  })

  it('throws on no config', () => {
    (() => {
      subject(null, {singleRun:true})
    }).should.throw('configFile must be defined')
  })

  it('calls karma with basic config', () => {
    subject(null, {configFile: './spec/karma.conf.js', singleRun:true})
    karmaStub.called.should.be.true

    karmaStub.args[0][0].should.be.eql({singleRun: true, configFile: require.resolve('./karma.conf.js')})
  })

  describe('appendFiles', () => {
    it('calls karma with basic config', () => {
      subject(null, {configFile: './spec/karma.conf.js', appendFiles: ['file2'], singleRun:true})
      karmaStub.called.should.be.true

      let test = karmaStub.args[0][0]
      test.should.be.eql({
        singleRun: true,
        configFile: require.resolve('./karma.conf.js'),
        files: ['bower_components/**/*.js', 'file2']
      })
    })

    it('calls karma with basic config - mult pop', () => {
      subject(null, {configFile: './spec/karma.conf.js', appendFiles: ['file2'], lengthToPop: 2, singleRun:true})
      karmaStub.called.should.be.true

      let test = karmaStub.args[0][0]
      test.should.be.eql({
        singleRun: true,
        configFile: require.resolve('./karma.conf.js'),
        files: ['file2']
      })
    })
  })
})

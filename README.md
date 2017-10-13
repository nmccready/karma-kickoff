# karma-kickoff
Kick off karma with ease along with running specific specs with one config file.

Running specific specs was the initial motivation behind this codebase. However, it has derrived into overriding several options of karma. All of this with the intent of not modifying the original config file. Why do this? Because this allows developers to quickly test and iterate changes without testing the entire suite. This also allows developers to not accidentally commit bad config changes (agreed amongst the team) to the main karma config file. Lastly, this keeps you from having several variations of configs to test the littlest (short term) of cases.

CLI Example:

```
karma-kickoff --files=./test/unit/*DatePicker*.Spec.js --browsers=Chrome --singleRun=false --autoWatch=true --disableCoverage=true
```

Example:

```coffee
gulp = require 'gulp'
{log} = require 'gulp-util'
_ = require 'lodash'
karmaKick = require 'karma-kickoff'
argv = require('yargs').argv

opts =
  configFile: '../../karma.conf.coffee'
  logFn: log

gulp.task 'karma', (done) ->
  karmaKick done, _.extend {}, opts,
    reporters:['dots', 'coverage']
    singleRun: true

gulp.task 'karmaMocha', (done) ->
  karmaKick(done, opts)

gulp.task 'karmaFiles', (done) ->
  karmaKick done, _.extend {}, opts,
    appendFiles: argv.files
    lengthToPop: 2
    singleRun: true
```

where karma.conf.coffee or js had:

```
....
files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js'
      require.resolve('stripe-debug')#https://github.com/bendrucker/angular-stripe/issues/23
      '_public/scripts/vendor.js'
      '_public/styles/vendor.css'
      'frontend/**/scripts/**/*.coffee'
      'spec/fixtures/*.html'
      'spec/fixtures/*.json'
      'spec/frontend/bootstrap.spec.coffee'
      {pattern:'frontend/**/*coffee', included: false}
      {pattern:'common/**/*coffee', included: false}
      {pattern:'spec/**/*coffee', included: false}
      # 'spec/common/**/*spec.coffee'
      'spec/frontend/**/*spec.coffee'
    ]
```

The karmaFiles task is the important example here as testing single or multiple files is easy. Via the `appendFiles` and `lengthToPop` options.

So to test a specific spec:
`gulp karmaFiles --files=./spec/frontend/map/providers/providers.onboarding.spec.coffee`

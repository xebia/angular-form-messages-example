var karmaFiles = require('test-runner-config').getKarmaFiles(require('./testFiles'));

module.exports = function (config) {
  config.set({
    files: karmaFiles.files,
    exclude: karmaFiles.exclude,
    plugins: [
      'karma-phantomjs2-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'json' }
      ]
    },
    preprocessors: {
      'app/scripts/**/*.js': ['coverage'],
      'app/templates/**/*.html': 'ng-html2js'
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },
    autoWatch: true,
    basePath: '../',
    browsers: ['PhantomJS2'],
    colors: true,
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 8080,
    singleRun: false
  });
};

module.exports = function (config) {
  config.set({

    files: [
      // Libraries
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/lodash/lodash.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'bower_components/jasmine-mox-matchers/src/jasmine-mox-matchers.js',
      'bower_components/mox/dist/mox.js',
      'bower_components/angular-form-messages/dist/angular-form-messages.js',
      'bower_components/angular-form-messages/dist/angular-form-messages-bootstrap.js',

      // Scripts
      'app/scripts/app.js',
      'app/scripts/**/*.js',
      'app/templates/**/*.html',

      // Test setup
      'test/mock/*.js',
      { pattern: 'test/mock/json/**/*.json', watched: true, served: true, included: false },

      // Tests
      'test/spec/**/*.js'
    ],

    plugins: [
      'karma-phantomjs-launcher',
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
    browsers: ['PhantomJS'],
    colors: true,
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 8080,
    singleRun: false
  });
};

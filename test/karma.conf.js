module.exports = function (config) {
  config.set({

    files: [
      // Libraries
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'bower_components/jasmine-mox-matchers/src/jasmine-mox-matchers-2.x.js',
      'bower_components/mox/src/mox.js',
      'bower_components/angular-form-messages/src/afModule.js',
      'bower_components/angular-form-messages/src/*.js',

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
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
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

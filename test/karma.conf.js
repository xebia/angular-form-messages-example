module.exports = function(config) {
  'use strict';

  config.set({

    files: [
      // Libraries
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'bower_components/mox/src/mox.js',
      'bower_components/angular-form-messages/src/afModule.js',
      'bower_components/angular-form-messages/src/*.js',

      // Scripts
      'app/scripts/**/*.js',

      // Mockdata
      'test/mock/moxConfig.js',
      'test/mock/karma-jasmine-jquery.js',

      // Tests
      'test/spec/**/*.js'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    preprocessors: {
      'app/templates/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },

    autoWatch: true,
    basePath: '../',
    frameworks: ['jasmine'],
    port: 8080,
    browsers: ['PhantomJS'],
    singleRun: false,
    colors: true,
    // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};

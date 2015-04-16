module.exports = function () {

  return {
    files: [
      { pattern: 'bower_components/jquery/dist/jquery.js', instrument: false },
      { pattern: 'bower_components/angular/angular.js', instrument: false },
      { pattern: 'bower_components/angular-messages/angular-messages.js', instrument: false },
      { pattern: 'bower_components/angular-mocks/angular-mocks.js', instrument: false },
      { pattern: 'bower_components/jasmine-jquery/lib/jasmine-jquery.js', instrument: false },
      { pattern: 'bower_components/mox/src/mox.js', instrument: false },
      { pattern: 'bower_components/angular-form-messages/src/afModule.js', instrument: false },
      { pattern: 'bower_components/angular-form-messages/src/*.js', instrument: false },

      // Mock data
      { pattern: 'test/mock/**/*.json', instrument: false, load: false },
      { pattern: 'test/mock/**/*.js', instrument: false },

      // Scripts
      'app/scripts/**/*.js',
      'app/scripts/**/*.html'
    ],
    tests: [
      { pattern: 'test/spec/**/*.js', instrument: false }
    ],
    preprocessors: {
      'app/templates/**/*.html': function (file) {
        return require('wallaby-ng-html2js-preprocessor').transform(file, {
          stripPrefix: 'app/'
        });
      }
    }
  };
};

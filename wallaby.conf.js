module.exports = function () {

  function n(file) { return { pattern: file, instrument: false }; }

  return {
    debug: true,
    files: [
      n('bower_components/jquery/dist/jquery.js'),
      n('bower_components/angular/angular.js'),
      n('bower_components/angular-messages/angular-messages.js'),
      n('bower_components/angular-mocks/angular-mocks.js'),
      n('bower_components/jasmine-jquery/lib/jasmine-jquery.js'),
      n('bower_components/jasmine-mox-matchers/src/jasmine-mox-matchers-2.x.js'),
      n('bower_components/mox/src/mox.js'),
      n('bower_components/angular-form-messages/src/afModule.js'),
      n('bower_components/angular-form-messages/src/*.js'),

      // Mock data
      { pattern: 'test/mock/**/*.json', instrument: false, load: false },
      n('test/mock/*.js'),

      // Scripts
      'app/scripts/app.js',
      'app/scripts/**/*.js',
      'app/templates/**/*.html'
    ],
    tests: [
      n('test/spec/**/*.js')
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

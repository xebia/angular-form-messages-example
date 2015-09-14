module.exports = function () {

  function n(file) { return { pattern: file, instrument: false }; }

  return {
    debug: true,
    files: [
      n('bower_components/jquery/dist/jquery.js'),
      n('bower_components/angular/angular.js'),
      n('bower_components/angular-route/angular-route.js'),
      n('bower_components/lodash/lodash.js'),
      n('bower_components/moment/moment.js'),
      n('bower_components/angular-messages/angular-messages.js'),
      n('bower_components/angular-mocks/angular-mocks.js'),
      n('bower_components/jasmine-jquery/lib/jasmine-jquery.js'),
      n('bower_components/jasmine-mox-matchers/src/jasmine-mox-matchers.js'),
      n('bower_components/mox/dist/mox.js'),
      n('bower_components/angular-form-messages/dist/angular-form-messages.js'),
      n('bower_components/angular-form-messages/dist/angular-form-messages-bootstrap.js'),

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

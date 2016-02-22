module.exports = [
  {
    type: 'lib',
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-messages/angular-messages.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/lodash/lodash.js',
      'node_modules/moment/moment.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/jasmine-mox-matchers/src/jasmine-mox-matchers.js',
      'node_modules/angular-mox/dist/mox.js',
      'node_modules/angular-form-messages/dist/angular-form-messages.js',
      'node_modules/angular-form-messages/dist/angular-form-messages-bootstrap.js'
    ]
  },
  {
    type: 'src',
    files: [
      'app/scripts/app.js',
      'app/scripts/**/*.js',
      'app/templates/**/*.html'
    ]
  },
  {
    type: 'config',
    files: [
      'test/mock/*.js'
    ]
  },
  {
    type: 'mock',
    files: [
      'test/mock/json/**/*.json'
    ]
  },
  {
    type: 'specs',
    files: [
      'test/spec/**/*.js'
    ]
  }
];

var wallabyFiles = require('test-runner-config').getWallabyFiles(require('./test/testFiles'));

module.exports = function () {
  return {
    files: wallabyFiles.files,
    tests: wallabyFiles.tests,
    preprocessors: {
      'app/templates/**/*.html': function (file) {
        return require('wallaby-ng-html2js-preprocessor').transform(file, {
          stripPrefix: 'app/'
        });
      }
    },
    env: {
      runner: require('phantomjs-prebuilt').path,
      params: {
        runner: '--web-security=false'
      }
    }
  };
};

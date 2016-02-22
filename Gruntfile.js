var serveStatic = require('serve-static');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  var paths = {
    app: 'app',
    test: 'test',
    dist: 'dist'
  };

  function mountFolder(dir) {
    console.log(serveStatic(require('path').resolve(grunt.template.process(dir))));
    return serveStatic(require('path').resolve(grunt.template.process(dir)));
  }

  grunt.initConfig({
    paths: paths,

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      server: {
        options: {
          open: true,
          middleware: function () {
            return [
              mountFolder(paths.app),
              mountFolder('node_modules'),
              mountFolder('app/styles')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function () {
            return [
              mountFolder(paths.app),
              mountFolder('test'),
              mountFolder('node_modules')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: paths.dist
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: paths.app + '/scripts/**/*.js'
      },
      test: {
        options: {
          jshintrc: paths.test + '/.jshintrc'
        },
        src: paths.test + '/spec/**/*.js'
      },
      config: {
        src: ['*.js', paths.test + '/{,!(spec)}/*.js']
      }
    },

    jscs: {
      options: {
        config: './.jscsrc'
      },
      all: {
        src: paths.app + '/scripts/**/*.js'
      },
      test: {
        src: paths.test + '/spec/**/*.js'
      },
      config: {
        src: ['*.js', paths.test + '/{,!(spec)}/*.js']
      }
    },
    jsonlint: {
      src: paths.test + '/mock/**/*.json'
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    coverage: {
      dist: {
        options: {
          thresholds: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
          },
          dir: 'coverage',
          root: paths.test
        }
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function () {
    grunt.task.run([
      'connect:server:keepalive'
    ]);
  });

  grunt.registerTask('test', [
    'connect:test',
    'karma',
    'coverage'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'jscs',
    'jsonlint',
    'test'
  ]);
};

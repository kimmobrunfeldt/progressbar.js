var fs = require('fs');

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['progressbar.js', 'test/**/*.js'],
        options: {
          globals: {
            jQuery: true,
            module: true
          }
        }
    },
    replace: {
      bundleShifty: {
        src: ['progressbar.js'],
        dest: 'dist/progressbar.js',
        replacements: [{
          from: '// #include shifty',
          to: grunt.file.read('shifty.min.js')
        }]
      }
    },
    uglify: {
      progressbar: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/progressbar.min.js': ['dist/progressbar.js']
        }
      }
    },
    shell: {
      mocha: {
        options: {
          stdout: true
        },
        command: 'mocha'
      },
      stageMinified: {
        options: {
            stdout: true,
            // If minified files do not change on release,
            // git command fails
            failOnError: false
        },
        command: 'git add dist/progressbar.js dist/progressbar.min.js dist/progressbar.min.js.map'
      },
      release: {
        options: {
          stdout: true
        },
        command: function(bump) {
          return './scripts/release.js ' + bump;
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('stageMinified', function() {
    grunt.task.run(['shell:stageMinified']);
  });

  // Build distributables to dist folder
  grunt.registerTask('build', ['replace:bundleShifty', 'uglify:progressbar'])

  // Test, build, and release library to public
  grunt.registerTask('release', function(arg) {
    var bump = arg || 'patch';

    grunt.task.run([
      'jshint',
      'build',
      'stageMinified',
      'shell:release:' + bump
    ]);
  });
};

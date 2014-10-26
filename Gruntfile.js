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
    shell: {
      stageMinified: {
        options: {
            stdout: true,
            // If minified files do not change on release,
            // git command fails
            failOnError: false
        },
        command: 'git add dist/progressbar.js dist/progressbar.min.js dist/progressbar.min.js.map'
      },
      browserifyDevelopment: {
        options: {
          stdout: true
        },
        command: 'browserify progressbar.js -o dist/progressbar.js --standalone ProgressBar'
      },
      browserifyMinified: {
        options: {
          stdout: true
        },
        command: 'browserify progressbar.js -o dist/progressbar.min.js --standalone ProgressBar'
      },
      release: {
        options: {
          stdout: true
        },
        command: function(bump) {
          bump = bump || 'patch';
          return './scripts/release.js ' + bump;
        }
      }
    },
    // Uglify must be run after browserify
    uglify: {
      progressbar: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/progressbar.min.js': ['dist/progressbar.min.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('stageMinified', function() {
    grunt.task.run(['shell:stageMinified']);
  });

  // Build distributables to dist folder
  grunt.registerTask('build', [
    'shell:browserifyDevelopment',
    'shell:browserifyMinified',
    'uglify:progressbar'
  ]);

  // Test, build, and release library to public
  grunt.registerTask('release', function(bump) {
    bump = bump || 'patch';

    grunt.task.run([
      'jshint',
      'build',
      'stageMinified',
      'shell:release:' + bump
    ]);
  });
};

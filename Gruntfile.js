var fs = require('fs');

// Travis has env variable CI=true
var CI = process.env.CI === 'true';


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
        // The output file is minified by uglifyjs later.
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
      },
      karma: {
        options: {
          stdout: true
        },
        // This will run tests in Sauce Lab
        command: './node_modules/karma/bin/karma start'
      },
      testem: {
        options: {
          stdout: true
        },
        // This will run tests in all local browsers available/detected
        command: 'testem ci -R dot -l chrome'
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

  grunt.registerTask('test', ['shell:testem']);

  grunt.registerTask('karma', ['shell:karma']);

  // Test, build, and release library to public
  grunt.registerTask('release', function(bump) {
    bump = bump || 'patch';

    grunt.task.run([
      'jshint',
      'test',
      'build',
      'stageMinified',
      'shell:release:' + bump
    ]);
  });
};

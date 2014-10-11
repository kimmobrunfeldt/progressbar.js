var fs = require('fs');

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      progressbar: {
        options: {
          sourceMap: true
        },
        files: {
          'progressbar.min.js': ['progressbar.js']
        }
      }
    },
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
      mocha: {
        options: {
          stdout: true
        },
        command: 'mocha'
      },
      updateDevVersion: {
        options: {
            stdout: true
        },
        command: 'git add bower.json; git commit -m "Update to dev version"'
      },
      commitMinified: {
        options: {
            stdout: true,
            // If minified files do not change on release,
            // git command fails
            failOnError: false
        },
        command: 'git add progressbar.min.js progressbar.min.js.map; git commit -m "Add minified script"'
      }
    },
    // https://github.com/geddski/grunt-release/issues/84
    release: {
      options: {
        npm: false,
        npmtag: false,
        commitMessage: 'Release <%= version %>',
        file: 'bower.json'
      }
    },
    extRelease: {
      options: {
        npm: false,
        npmtag: false,
        commitMessage: 'Release <%= version %>',
        file: 'bower.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-release');

  // To be able to register custom release task, rename plugin's task
  grunt.task.renameTask('release', 'extRelease');

  // Updates version to development version. There should be only one
  // commit in history where bower.json contains the actual released version.
  // Other commits contain -dev suffix.
  grunt.registerTask('updateDevVersion', function() {
    var bowerJson = grunt.file.readJSON('bower.json');
    if (endsWith(bowerJson.version, '-dev')) {
        return;
    }

    bowerJson.version += '-dev';
    var prettyJson = JSON.stringify(bowerJson, null, 2);
    grunt.file.write('bower.json', prettyJson);

    grunt.task.run(['shell:updateDevVersion']);
  });

  grunt.registerTask('commitMinified', function() {
    grunt.task.run(['uglify:progressbar', 'shell:commitMinified']);
  });

  grunt.registerTask('release', function(arg) {
    arg = arg || 'patch';

    grunt.task.run([
      'jshint',
      'commitMinified',
      'extRelease:' + arg,
      'updateDevVersion'
    ]);
  });
};

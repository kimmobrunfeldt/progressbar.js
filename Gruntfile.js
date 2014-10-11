var fs = require('fs');

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['*.js', 'test/**/*.js'],
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
      }
    },
    extRelease: {
      options: {
        // Don't release to NPM
        npm: false,
        npmtag: false,
        file: 'bower.json',
        // default: 'release <%= version %>'
        commitMessage: 'Release <%= version %>',
        tagMessage: 'Tag <%= version %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
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

    grunt.task.run(['shell:commitDevVersion']);
  });

  grunt.registerTask('release', function(arg) {
    grunt.task.run(['jshint', 'extRelease:' + arg, 'shell:updateDevVersion']);
  });
};

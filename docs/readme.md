# Contribution documentation

Documentation for library developers.

This package uses npm/node tools just in the developer environment. **The actual
delivered package is only released in Bower.** I would prefer to discard Grunt as a
task runner but [grunt-release](https://github.com/geddski/grunt-release)
was the best available release automation tool for a Bower package.

*ProgressBar.js* depends on tweening library called [shifty](https://github.com/jeremyckahn/shifty).
*Shifty* is bundled inside the scripts in [dist/](dist/) directory.
Dependency is bundled in to ease using the library.


## Install environment

Install tools needed for development:

    npm install

## Release

**Before releasing, make sure there are no uncommitted files,
tests pass and jshint gives no errors.**

Creating a new release of the package is simple:

* Commit all changes
* Run `grunt release`, which will create new tag and publish code to GitHub

    Bower detects your new version of git tag.

* Edit GitHub release notes

To see an example how to release minor/major, check https://github.com/geddski/grunt-release

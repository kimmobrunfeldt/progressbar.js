# Contribution documentation

Pull requests and contributions are warmly welcome.
Please follow existing code style and commit message conventions. Also remember to keep documentation
updated.

## General project stuff

This package uses npm/node tools just in the developer environment. **The actual
delivered package is only released in Bower.** I would prefer to discard Grunt as a
task runner but [grunt-release](https://github.com/geddski/grunt-release)
was the best available release automation tool for a Bower package. That said, the grunt-release package
is not very high quality but works.

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


## Decision log

* Animate SVG paths with CSS3 transitions to make animations smooth.
* API must provide built-in shapes and a way to use totally custom SVG.
* Document manually. More overhead and risk of out dated information but easier to get started and contribute with pull requests.
* Animate paths with JS because IE does not support CSS transitions for SVG properties. This also allows
animation customizations and possible even using different easings per animation(in future).
* Expose ProgressBar so it can be used with basic module loaders or as a global.
* Bundle shifty inside the final distributable instead of requiring users to install both libs. If someone has already included shifty, then a custom build should be made.
* Ship distributables to Bower. Fully automate releasing.

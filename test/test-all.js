// These tests are run with two different test runners which work a bit
// differently. Runners are Testem and Karma. Read more about them in
// CONTRIBUTING.md
// Supporting both has lead to some compromises.

var utils = require('./utils');
// https://github.com/mochajs/mocha/wiki/Shared-Behaviours
var sharedTests = require('./shared-behaviour');
var ProgressBar = require("../src/main");


var afterEachCase = function() {
    try {
        this.bar.destroy();
    } catch (e) {
        // Some test cases destroy the bar themselves and calling again
        // throws an error
    }
};

describe('Line', function() {
    beforeEach(function() {
        // Append progress bar to body since adding a custom HTML and div
        // with Karma was not that trivial compared to Testem
        this.bar = new ProgressBar.Line('body');
    });

    afterEach(afterEachCase);
    sharedTests();
});


describe('Circle', function() {
    beforeEach(function() {
        this.bar = new ProgressBar.Circle('body');
    });

    afterEach(afterEachCase);
    sharedTests();
});


describe('Square', function() {
    beforeEach(function() {
        this.bar = new ProgressBar.Square('body');
    });

    afterEach(afterEachCase);
    sharedTests();
});

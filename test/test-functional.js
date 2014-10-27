// These tests are run with two different test runners which work a bit
// differently. Runners are Testem and Karma. Read more about them in
// CONTRIBUTING.md
// Supporting both has lead to some compromises.

var expect = require('expect.js');

var utils = require('./utils');
var ProgressBar = require("../progressbar");

describe('ProgressBar', function() {
    it('animate should change SVG path stroke-dashoffset property', function(done) {
        // Append progress bar to body since adding a custom HTML and div
        // with Karma was not that trivial compared to Testem
        var line = new ProgressBar.Line('body');
        var offset = utils.getComputedStyle(line.path, 'stroke-dashoffset');
        line.animate(1, {duration: 1000});

        setTimeout(function checkOffsetHasChanged() {
            var offsetMiddleOfAnimation = utils.getComputedStyle(
                line.path,
                'stroke-dashoffset'
            );

            expect(offset).not.to.be(offsetMiddleOfAnimation);
            done();
        }, 100);
    });

    it('set should change value', function() {
        var line = new ProgressBar.Line('body');
        var offset = utils.getComputedStyle(line.path, 'stroke-dashoffset');
        expect(line.value()).to.be(0);
        
        line.set(1);
        expect(line.value()).to.be(1);
    });
});

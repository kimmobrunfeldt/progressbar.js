// These tests are run with two different test runners which work a bit
// differently. Runners are Testem and Karma. Read more about them in
// CONTRIBUTING.md
// Supporting both has lead to some compromises.

var expect = require('expect.js');

var utils = require('./utils');
var ProgressBar = require("../src/progressbar");

describe('ProgressBar', function() {
    var line;

    beforeEach(function() {
        // Append progress bar to body since adding a custom HTML and div
        // with Karma was not that trivial compared to Testem
        line = new ProgressBar.Line('body');
    });

    afterEach(function() {
        try {
            line.destroy();
        } catch (e) {
            // Some test cases destroy the line themselves and calling again
            // throws an error
        }
    });

    it('animate should change SVG path stroke-dashoffset property', function(done) {
        var progressAtStart = line.value();
        line.animate(1, {duration: 1000});

        setTimeout(function checkOffsetHasChanged() {
            expect(line.value()).to.be.greaterThan(progressAtStart);
            expect(line.value()).to.be.lessThan(1);
            done();
        }, 100);
    });

    it('bar should be empty after initialization', function() {
        expect(line.value()).to.be(0);
    });

    it('set should change value', function() {
        line.set(1);
        expect(line.value()).to.be(1);
    });

    it('animate should change value', function(done) {
        line.set(1);
        line.animate(0, {duration: 500});

        setTimeout(function checkValueHasChanged() {
            expect(line.value()).not.to.be(1);
        }, 100);

        setTimeout(function checkAnimationHasCompleted() {
            expect(line.value()).to.be(0);
            done();
        }, 800);
    });

    it('stop() should stop animation', function(done) {
        var offset = utils.getComputedStyle(line.path, 'stroke-dashoffset');
        line.animate(1, {duration: 1000});

        var progressAfterStop;
        setTimeout(function stopAnimation() {
            line.stop();
            progressAfterStop = line.value();
        }, 100);

        setTimeout(function checkProgressAfterStop() {
            expect(progressAfterStop).to.be(line.value());
            done();
        }, 400);
    });

    it('destroy() should delete element', function() {
        var svg = document.querySelector('svg');
        expect(svg).not.to.be(null);

        line.destroy();
        svg = document.querySelector('svg');
        expect(svg).to.be(null);
    });

    it('destroy() should make object unusable', function() {
        line.destroy();

        var methodsShouldThrow = ['destroy', 'value', 'set', 'animate', 'stop'];
        methodsShouldThrow.forEach(function(methodName) {
            expect(function shouldThrow() {
                line[methodName]();
            }).to.throwError();
        });

        expect(line.svg).to.be(null);
        expect(line.path).to.be(null);
        expect(line.trail).to.be(null);
    });
});

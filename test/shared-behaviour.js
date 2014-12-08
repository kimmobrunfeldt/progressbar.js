// Tests which test shared behaviour of all progress bar shapes


var chai = require('chai');
var chaiStats = require('chai-stats');
chai.use(chaiStats);
var expect = chai.expect;

var utils = require('./utils');

var PRECISION = 2;


var sharedTests = function sharedTests() {
    it('animate should change SVG path stroke-dashoffset property', function(done) {
        var progressAtStart = this.bar.value();
        this.bar.animate(1, {duration: 1000});

        var self = this;
        setTimeout(function checkOffsetHasChanged() {
            expect(self.bar.value()).to.be.greaterThan(progressAtStart);
            expect(self.bar.value()).to.be.lessThan(1);
            done();
        }, 100);
    });

    it('bar should be empty after initialization', function() {
        expect(this.bar.value()).to.almost.equal(0, PRECISION);
    });

    it('set should change value', function() {
        this.bar.set(1);
        expect(this.bar.value()).to.almost.equal(1, PRECISION);
    });

    it('animate should change value', function(done) {
        this.bar.set(1);
        this.bar.animate(0, {duration: 500});

        var self = this;
        setTimeout(function checkValueHasChanged() {
            expect(self.bar.value()).not.to.almost.equal(1, PRECISION);
        }, 100);

        setTimeout(function checkAnimationHasCompleted() {
            expect(self.bar.value()).to.almost.equal(0, PRECISION);
            done();
        }, 800);
    });

    it('stop() should stop animation', function(done) {
        var offset = utils.getComputedStyle(this.bar.path, 'stroke-dashoffset');
        this.bar.animate(1, {duration: 1000});

        var self = this;
        var progressAfterStop;
        setTimeout(function stopAnimation() {
            self.bar.stop();
            progressAfterStop = self.bar.value();
        }, 100);

        setTimeout(function checkProgressAfterStop() {
            expect(progressAfterStop).to.almost.equal(self.bar.value(), PRECISION);
            done();
        }, 400);
    });

    it('destroy() should delete element', function() {
        var svg = document.querySelector('svg');
        expect(svg).not.to.equal(null);

        this.bar.destroy();
        svg = document.querySelector('svg');
        expect(svg).to.equal(null);
    });

    it('destroy() should make object unusable', function() {
        this.bar.destroy();

        var self = this;
        var methodsShouldThrow = ['destroy', 'value', 'set', 'animate', 'stop'];
        methodsShouldThrow.forEach(function(methodName) {
            expect(function shouldThrow() {
                self[methodName]();
            }).to.throw(Error);
        });

        expect(this.bar.svg).to.equal(null);
        expect(this.bar.path).to.equal(null);
        expect(this.bar.trail).to.equal(null);
    });
};

module.exports = sharedTests;

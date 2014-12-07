// Tests which test shared behaviour of all progress bar shapes


var expect = require('expect.js');
var utils = require('./utils');


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
        expect(this.bar.value()).to.be(0);
    });

    it('set should change value', function() {
        this.bar.set(1);
        expect(this.bar.value()).to.be(1);
    });

    it('animate should change value', function(done) {
        this.bar.set(1);
        this.bar.animate(0, {duration: 500});

        var self = this;
        setTimeout(function checkValueHasChanged() {
            expect(self.bar.value()).not.to.be(1);
        }, 100);

        setTimeout(function checkAnimationHasCompleted() {
            expect(self.bar.value()).to.be(0);
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
            expect(progressAfterStop).to.be(self.bar.value());
            done();
        }, 400);
    });

    it('destroy() should delete element', function() {
        var svg = document.querySelector('svg');
        expect(svg).not.to.be(null);

        this.bar.destroy();
        svg = document.querySelector('svg');
        expect(svg).to.be(null);
    });

    it('destroy() should make object unusable', function() {
        this.bar.destroy();

        var self = this;
        var methodsShouldThrow = ['destroy', 'value', 'set', 'animate', 'stop'];
        methodsShouldThrow.forEach(function(methodName) {
            expect(function shouldThrow() {
                self[methodName]();
            }).to.throwError();
        });

        expect(this.bar.svg).to.be(null);
        expect(this.bar.path).to.be(null);
        expect(this.bar.trail).to.be(null);
    });
};

module.exports = sharedTests;

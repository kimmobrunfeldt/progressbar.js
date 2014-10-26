// Mocha and assertion libraries are added as scripts to test.html

var utils = require('./utils');
var ProgressBar = require("../progressbar");

describe('ProgressBar', function() {
    it('animate should change SVG path property', function(done) {
        var line = new ProgressBar.Line('#container');
        var offset = utils.getComputedStyle(line.path, 'stroke-dashoffset');
        line.animate(1, {duration: 200});

        setTimeout(function checkOffsetHasChanged() {
            var offsetMiddleOfAnimation = utils.getComputedStyle(
                line.path,
                'stroke-dashoffset'
            );

            expect(offset).not.to.be(offsetMiddleOfAnimation);
            done();
        }, 100);
    });
});

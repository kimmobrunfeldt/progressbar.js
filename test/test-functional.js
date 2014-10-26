var test = require('tape');

var utils = require('./utils');
var ProgressBar = require("../progressbar");

test('animate should change SVG path property', function(t) {
    t.plan(1);

    var line = new ProgressBar.Line('#container');
    var offset = utils.getComputedStyle(line.path, 'stroke-dashoffset');
    line.animate(1, {duration: 200});

    setTimeout(function checkOffsetHasChanged() {
        var offsetMiddleOfAnimation = utils.getComputedStyle(
            line.path,
            'stroke-dashoffset'
        );

        t.notEqual(offset, offsetMiddleOfAnimation);
    }, 100);
});

// These tests are run with two different test runners which work a bit
// differently. Runners are Testem and Karma. Read more about them in
// CONTRIBUTING.md
// Supporting both has lead to some compromises.

var chai = require('chai');
var chaiStats = require('chai-stats');
chai.use(chaiStats);
var expect = chai.expect;

// https://github.com/mochajs/mocha/wiki/Shared-Behaviours
var sharedTests = require('./shared-behaviour');
var ProgressBar = require("../src/main");
var utils = require('../src/utils');


var afterEachCase = function() {
    try {
        this.bar.destroy();
    } catch (e) {
        // Some test cases destroy the bar themselves and calling again
        // throws an error
    }
};

var barOpts = {
    text: { value: 'Test' },
    trailWidth: 1
};

describe('Line', function() {
    beforeEach(function() {
        // Append progress bar to body since adding a custom HTML and div
        // with Karma was not that trivial compared to Testem
        this.bar = new ProgressBar.Line('body', barOpts);
    });

    afterEach(afterEachCase);
    sharedTests();
});


describe('Circle', function() {
    beforeEach(function() {
        this.bar = new ProgressBar.Circle('body', barOpts);
    });

    afterEach(afterEachCase);
    sharedTests();
});


describe('Square', function() {
    beforeEach(function() {
        this.bar = new ProgressBar.Square('body', barOpts);
    });

    afterEach(afterEachCase);
    sharedTests();
});

describe('utils', function() {
    it('extend without recursive should not merge', function() {
        var first = {
            a: { content: 1 },
            b: 2,
            c: 3,
            d: [1, 2]

        };
        var second = {
            a: { test: 1 },
            b: 4,
            d: [],
            e: 1
        };
        utils.extend(first, second);


        // These should normally override a's attributes
        expect(first.a.content).to.equal(undefined);
        expect(first.b).to.equal(second.b);
        expect(first.d).to.equal(second.d);
        expect(first.e).to.equal(second.e);

        // b.c is undefined so c should not be modified
        expect(first.c).to.equal(first.c);
    });

    it('extend with recursive should merge', function() {
        var first = {
            a: {
                content: 1,
                b: {
                    content: 2
                }
            },
            arr: [1, 2]
        };
        var second = {
            a: {
                test: 1,
                b: {
                    test: 2
                }
            },
            arr: []
        };
        utils.extend(first, second, true);

        // These should normally override a's attributes
        expect(first).to.deep.equal({
            a: {
                content: 1,
                test: 1,
                b: {
                    content: 2,
                    test: 2
                }
            },
            arr: []
        });
    });
});

// Triangle shaped progress bar

const {utils, Shape} = require('progressbar.js');

var Triangle = function Triangle(container, options) {
    this._pathTemplate = 'M 50,{center} L 98,{bottomCenter}' +
                         ' L 2,{bottomCenter} L 50,{center}';
    Shape.apply(this, arguments);
};

Triangle.prototype = new Shape();
Triangle.prototype.constructor = Triangle;

Triangle.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2,
        bottomCenter: 100 - opts.strokeWidth / 2
    });
};

Triangle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Triangle;

// Line shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Line = function Line(container, options) {
    this._pathTemplate = 'M 0,{center} L 100,{center}';
    this._pathOutlineTemplate =
        ' M 0,0' +
        ' m {outlineWidth},{outlineWidth}  H100' +
        ' m -{outlineWidth},0  v {height}' +
        ' m 0,-{outlineWidth}  H0' +
        ' m {outlineWidth},0 v -{height}';
    Shape.apply(this, arguments);
};

Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
};

Line.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2
    });
};

Line.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

Line.prototype._outlineString = function _outlineString(opts){
    /*
      The outline is drawn inside the circle so that the path doesn't clip
    */

    // prevent the outline extending outside the circle
    if(opts.outlineWidth && opts.outlineWidth > opts.strokeWidth){
      opts.outlineWidth = opts.strokeWidth / 2;
    }

    return utils.render(this._pathOutlineTemplate, {
        outlineWidth: opts.outlineWidth / 2,
        height: opts.strokeWidth - opts.outlineWidth / 2
    });
};

module.exports = Line;

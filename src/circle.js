// Circle shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Circle = function Circle(container, options) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m 0,-{radius}' +
        ' a {radius},{radius} 0 1 1 0,{2radius}' +
        ' a {radius},{radius} 0 1 1 0,-{2radius}';

    this._pathOutlineTemplate =
        ' M 50,50 m 0,-{inner_radius}' +
        ' a {inner_radius},{inner_radius} 0 1 1 0,{2inner_radius}' +
        ' a {inner_radius},{inner_radius} 0 1 1 0,-{2inner_radius}'+
        'M 50,50 m 0,-{outer_radius}' +
        ' a {outer_radius},{outer_radius} 0 1 1 0,{2outer_radius}' +
        ' a {outer_radius},{outer_radius} 0 1 1 0,-{2outer_radius}';

    this.containerAspectRatio = 1;

    Shape.apply(this, arguments);
};

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
    var widthOfWider = opts.strokeWidth;
    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
        widthOfWider = opts.trailWidth;
    }

    var r = 50 - widthOfWider / 2;

    return utils.render(this._pathTemplate, {
        radius: r,
        '2radius': r * 2
    });
};

Circle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

Circle.prototype._outlineString = function _outlineString(opts){
    /*
      The outline is drawn inside the circle so that the path doesn't clip
    */

    // prevent the outline extending outside the circle
    if(opts.outlineWidth && opts.outlineWidth > opts.strokeWidth){
      opts.outlineWidth = opts.strokeWidth / 2;
    }

    var inner_r = 50 - opts.strokeWidth + opts.outlineWidth/2;
    var outer_r = 50 - opts.outlineWidth/2;

    return utils.render(this._pathOutlineTemplate, {
      inner_radius: inner_r,
      '2inner_radius': inner_r * 2,
      outer_radius: outer_r,
      '2outer_radius': outer_r * 2
    });
};

module.exports = Circle;

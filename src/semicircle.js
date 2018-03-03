// Semi-SemiCircle shaped progress bar

var Shape = require('./shape');
var Circle = require('./circle');
var utils = require('./utils');

var SemiCircle = function SemiCircle(container, options) {
    // Use one arc to form a SemiCircle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m -{radius},0' +
        ' a {radius},{radius} 0 1 1 {2radius},0';

    this._pathOutlineTemplate =
        ' M 50,50 m -{inner_radius},0' +
        ' a {inner_radius},{inner_radius} 0 1 1 {2inner_radius},0' +
        ' l {width} 0'+
        'M 50,50 m {outer_radius},0' +
        ' a {outer_radius},{outer_radius} 0 1 0 -{2outer_radius},0' +
        ' l {width} 0';

    this.containerAspectRatio = 2;

    Shape.apply(this, arguments);
};

SemiCircle.prototype = new Shape();
SemiCircle.prototype.constructor = SemiCircle;

SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 50');
};

SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
    opts,
    container,
    textContainer
) {
    if (opts.text.style) {
        // Reset top style
        textContainer.style.top = 'auto';
        textContainer.style.bottom = '0';

        if (opts.text.alignToBottom) {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
        } else {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
        }
    }
};

// Share functionality with Circle, just have different path
SemiCircle.prototype._pathString = Circle.prototype._pathString;
SemiCircle.prototype._trailString = Circle.prototype._trailString;
SemiCircle.prototype._outlineString = function _outlineString(opts){
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
      '2outer_radius': outer_r * 2,
      width: opts.strokeWidth - opts.outlineWidth
    });
};

module.exports = SemiCircle;

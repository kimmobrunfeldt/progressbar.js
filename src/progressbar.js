var Tweenable = require('shifty');

var EASING_ALIASES = {
    easeIn: 'easeInCubic',
    easeOut: 'easeOutCubic',
    easeInOut: 'easeInOutCubic'
};

var DESTROYED_ERROR = 'Object is destroyed';
var CONSTRUCTOR_CALL_ERROR = 'Constructor was called without new keyword';

// Base object for different progress bar shapes
var Progress = function Progress(container, opts) {
    // Throw a better error if progress bars are not initialized with `new`
    // keyword
    if (!(this instanceof Progress)) {
        throw new Error(CONSTRUCTOR_CALL_ERROR);
    }

    // Prevent calling constructor without parameters so inheritance
    // works correctly. To understand, this is how Progress is inherited:
    //
    //   Line.prototype = new Progress();
    //
    // We just want to set the prototype for Line.
    if (arguments.length === 0) return;

    var svgView = this._createSvgView(opts);

    var element;
    if (isString(container)) {
        element = document.querySelector(container);
    } else {
        element = container;
    }
    element.appendChild(svgView.svg);

    var newOpts = extend({
        attachment: this
    }, opts);
    this._progressPath = new Path(svgView.path, newOpts);

    // Expose public attributes
    this.svg = svgView.svg;
    this.path = svgView.path;
    this.trail = svgView.trail;
};

Progress.prototype.animate = function animate(progress, opts, cb) {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    this._progressPath.animate(progress, opts, cb);
};

Progress.prototype.stop = function stop() {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    this._progressPath.stop();
};

Progress.prototype.destroy = function destroy() {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);

    this.stop();
    this.svg.parentNode.removeChild(this.svg);
    this.svg = null;
    this.path = null;
    this.trail = null;
    this._progressPath = null;
};

Progress.prototype.set = function set(progress) {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    this._progressPath.set(progress);
};

Progress.prototype.value = function value() {
    if (this._progressPath === null) throw new Error(DESTROYED_ERROR);
    return this._progressPath.value();
};

Progress.prototype._createSvgView = function _createSvgView(opts) {
    opts = extend({
        color: "#555",
        strokeWidth: 1.0,
        trailColor: null,
        trailWidth: null,
        fill: null
    }, opts);

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._initializeSvg(svg, opts);

    var trailPath = null;
    if (opts.trailColor || opts.trailWidth) {
        var trailOpts = extend({}, opts);
        trailOpts.color = opts.trailColor;

        if (opts.trailWidth) {
            trailOpts.strokeWidth = opts.trailWidth;
        }

        if (opts.centerTrail) {
            trailOpts.radiusAdjust = opts.strokeWidth / 2;
        }

        // When trail path is set, fill must be set for it instead of the
        // actual path to prevent trail stroke from clipping
        opts.fill = null;
        trailPath = this._createPath(trailOpts);
        svg.appendChild(trailPath);
    }

    var path = this._createPath(opts);
    svg.appendChild(path);

    return {
        svg: svg,
        path: path,
        trail: trailPath
    };
};

Progress.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute("viewBox", "0 0 100 100");
};

Progress.prototype._createPath = function _createPath(opts) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", this._pathString(opts));
    path.setAttribute("stroke", opts.color);
    path.setAttribute("stroke-width", opts.strokeWidth);

    if (opts.fill) {
        path.setAttribute("fill", opts.fill);
    } else {
        path.setAttribute("fill-opacity", "0");
    }

    return path;
};

Progress.prototype._pathString = function _pathString(opts) {
    throw new Error("Override this function for each progress bar");
};

// Progress bar shapes

var Line = function Line(container, options) {
    Progress.apply(this, arguments);
};

Line.prototype = new Progress();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute("viewBox", "0 0 100 " + opts.strokeWidth);
    svg.setAttribute("preserveAspectRatio", "none");
};

Line.prototype._pathString = function _pathString(opts) {
    var pathString = "M 0,{c} L 100,{c}";
    var center = opts.strokeWidth / 2;
    pathString = pathString.replace(/\{c\}/g, center);
    return pathString;
};

var Circle = function Circle(container, options) {
    Progress.apply(this, arguments);
};

Circle.prototype = new Progress();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    var pathString = "M 50,50 m 0,-{r} a {r},{r} 0 1 1 0,{r*2} a {r},{r} 0 1 1 0,-{r*2}";
    var r = 50 - opts.strokeWidth / 2 - (opts.radiusAdjust || 0);
    pathString = pathString.replace(/\{r\}/g, r);
    pathString = pathString.replace(/\{r\*2\}/g, r * 2);
    return pathString;
};

var Square = function Square(container, options) {
    Progress.apply(this, arguments);
};

Square.prototype = new Progress();
Square.prototype.constructor = Square;

Square.prototype._pathString = function _pathString(opts) {
    var pathString = "M 0,{s/2} L {w},{s/2} L {w},{w} L {s/2},{w} L {s/2},{s}";
    var w = 100 - opts.strokeWidth / 2;
    pathString = pathString.replace(/\{w\}/g, w);
    pathString = pathString.replace(/\{s\}/g, opts.strokeWidth);
    pathString = pathString.replace(/\{s\/2\}/g, opts.strokeWidth / 2);
    return pathString;
};

// Lower level API to animate any kind of svg path

var Path = function Path(path, opts) {
    opts = extend({
        duration: 800,
        easing: "linear",
        from: {},
        to: {},
        step: noop
    }, opts);

    this._path = path;
    this._opts = opts;
    this._tweenable = null;

    // Set up the starting positions
    var length = this._path.getTotalLength();
    this._path.style.strokeDasharray = length + ' ' + length;
    this._path.style.strokeDashoffset = length;
};

Path.prototype.value = function value() {
    var computedStyle = window.getComputedStyle(this._path, null);
    var offset = computedStyle.getPropertyValue('stroke-dashoffset');
    // Remove 'px' suffix
    offset = parseFloat(offset, 10);
    var length = this._path.getTotalLength();

    var progress = 1 - offset / length;
    // Round number to prevent returning very small number like 1e-30, which
    // is practically 0
    return parseFloat(progress.toFixed(10), 10);
};

Path.prototype.set = function set(progress) {
    this.stop();

    var length = this._path.getTotalLength();
    this._path.style.strokeDashoffset = length - progress * length;
};

Path.prototype.stop = function stop() {
    this._stopTween();

    var computedStyle = window.getComputedStyle(this._path, null);
    var offset = computedStyle.getPropertyValue('stroke-dashoffset');
    this._path.style.strokeDashoffset = offset;
};

// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate = function animate(progress, opts, cb) {
    opts = opts || {};

    if (isFunction(opts)) {
        cb = opts;
        opts = {};
    }

    var passedOpts = opts;

    // Copy default opts to new object so defaults are not modified
    var defaultOpts = extend({}, this._opts);
    opts = extend(defaultOpts, opts);

    var shiftyEasing = this._easing(opts.easing);
    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

    this.stop();

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this._path.getBoundingClientRect();

    var computedStyle = window.getComputedStyle(this._path, null);
    var offset = computedStyle.getPropertyValue('stroke-dashoffset');
    // Remove 'px' suffix
    offset = parseFloat(offset, 10);

    var length = this._path.getTotalLength();
    var newOffset = length - progress * length;

    var self = this;

    this._tweenable = new Tweenable();
    this._tweenable.tween({
        from: extend({ offset: offset }, values.from),
        to: extend({ offset: newOffset }, values.to),
        duration: opts.duration,
        easing: shiftyEasing,
        step: function(state) {
            self._path.style.strokeDashoffset = state.offset;
            opts.step(state, opts.attachment);
        },
        finish: function(state) {
            // step function is not called on the last step of animation
            self._path.style.strokeDashoffset = state.offset;
            opts.step(state, opts.attachment);

            if (isFunction(cb)) {
                cb();
            }
        }
    });
};

// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
    if (opts.from && opts.to) {
        return {
            from: opts.from,
            to: opts.to
        };
    }

    var from = Tweenable.interpolate(
        this._opts.from,
        this._opts.to,
        this.value(),
        easing
    );

    var to = Tweenable.interpolate(
        this._opts.from,
        this._opts.to,
        progress,
        easing
    );

    return {
        from: from,
        to: to
    };
};

Path.prototype._stopTween = function _stopTween() {
    if (this._tweenable !== null) {
        this._tweenable.stop();
        this._tweenable.dispose();
        this._tweenable = null;
    }
};

Path.prototype._easing = function _easing(easing) {
    if (EASING_ALIASES.hasOwnProperty(easing)) {
        return EASING_ALIASES[easing];
    }

    return easing;
};

// Utility functions

function noop() {}

// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination, source) {
    destination = destination || {};
    source = source || {};

    for (var attrName in source) {
        if (source.hasOwnProperty(attrName)) {
            destination[attrName] = source[attrName];
        }
    }

    return destination;
}

function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}

function isFunction(obj) {
    return typeof obj === "function";
}

module.exports = {
    Line: Line,
    Circle: Circle,
    Square: Square,
    Path: Path
};

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('progressbar', [], function() {
            return factory();
        });
    } else {
        // Browser globals
        root.ProgressBar = factory();
    }
}(this, function() {

    // The next line will be replaced with minified version of shifty library
    // in a build step
    // #include shifty

    var EASING_ALIASES = {
        easeIn: 'easeInCubic',
        easeOut: 'easeOutCubic',
        easeInOut: 'easeInOutCubic'
    };

    // Base object for different progress bar shapes
    var Progress = function(container, opts) {
        // Prevent calling constructor without parameters so inheritance
        // works correctly
        if (arguments.length === 0) return;

        var svgView = this._createSvgView(opts);

        var element;
        if (isString(container)) {
            element = document.querySelector(container);
        } else {
            element = container;
        }
        element.appendChild(svgView.svg);

        this._path = new Path(svgView.path, opts);
    };

    Progress.prototype.animate = function animate(progress, opts, cb) {
        this._path.stop();
        this._path.animate(progress, opts, cb);
    };

    Progress.prototype.stop = function stop() {
        this._path.stop();
    };

    Progress.prototype.set = function set(progress) {
        this._path.set(progress);
    };

    Progress.prototype._createSvgView = function _createSvgView(opts) {
        opts = extend({
            color: "#555",
            strokeWidth: 1.0,
            trailColor: null,
            fill: null
        }, opts);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");

        if (opts.trailColor) {
            var trailOpts = extend({}, opts);
            trailOpts.color = opts.trailColor;

            // When trail path is set, fill must be set for it instead of the
            // actual path to prevent trail stroke from clipping
            opts.fill = null;
            var trailPath = this._createPath(trailOpts);
            svg.appendChild(trailPath);
        }

        var path = this._createPath(opts);
        svg.appendChild(path);

        return {
            svg: svg,
            path: path
        };
    };

    Progress.prototype._createPath = function _createPath(opts) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", this._pathString(opts));
        path.setAttributeNS(null, "stroke", opts.color);
        path.setAttributeNS(null, "stroke-width", opts.strokeWidth);

        if (opts.fill) {
            path.setAttributeNS(null, "fill", opts.fill);
        } else {
            path.setAttributeNS(null, "fill-opacity", "0");
        }

        return path;
    };

    Progress.prototype._pathString = function _pathString(opts) {
        throw new Error("Override this function for each progress bar");
    };

    // Progress bar shapes

    var Circle = function(container, options) {
        Progress.apply(this, arguments);
    };

    Circle.prototype = new Progress();
    Circle.prototype.constructor = Circle;

    Circle.prototype._pathString = function _pathString(opts) {
        // Use two arcs to form a circle
        // See this answer http://stackoverflow.com/a/10477334/1446092
        var pathString = "M 50,50 m 0,-{r} a {r},{r} 0 1 1 0,{r*2} a {r},{r} 0 1 1 0,-{r*2}";
        var r = 50 - opts.strokeWidth / 2;
        pathString = pathString.replace(/\{r\}/g, r);
        pathString = pathString.replace(/\{r\*2\}/g, r * 2);
        return pathString;
    };

    var Square = function(container, options) {
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

    var Path = function(path, opts) {
        opts = extend({
            duration: 800,
            easing: "linear"
        }, opts);

        this._path = path;
        this._opts = opts;
        this._tweenable = null;

        // Set up the starting positions
        var length = this._path.getTotalLength();
        this._path.style.strokeDasharray = length + ' ' + length;
        this._path.style.strokeDashoffset = length;
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
        if (isFunction(opts)) {
            cb = opts;
            opts = {};
        }

        // Copy default opts to new object so defaults are not modified
        var defaultOpts = extend({}, this._opts);
        opts = extend(defaultOpts, opts);

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

        // Path reference must be created like this instead of var self = this;
        // Somehow the self references sometimes to incorrect instance if
        // created like that.
        var thisPath = this._path;
        this._tweenable = new Tweenable();
        this._tweenable.tween({
            from: { offset: offset },
            to:   { offset: newOffset },
            duration: opts.duration,
            easing: this._easing(opts.easing),
            step: function(state) {
                thisPath.style.strokeDashoffset = state.offset;
            },
            finish: function(state) {
                // step function is not called on the last step of animation
                thisPath.style.strokeDashoffset = state.offset;

                if (isFunction(cb)) {
                    cb();
                }
            }
        });
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

    // Copy all attributes from source object to destination object.
    // destination object is mutated.
    function extend(destination, source) {
        destination = destination || {};

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

    // Expose modules
    var ProgressBar = {
        Circle: Circle,
        Square: Square,
        Path: Path
    };

    return ProgressBar;
}));

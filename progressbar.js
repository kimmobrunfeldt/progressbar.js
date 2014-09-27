(function(root) {

    // Base object for different progress bar shapes

    var Progress = function(container, opts) {
        // Prevent calling constructor without parameters so inheritance
        // works correctly
        if (arguments.length === 0) return;

        var svgView = this._createSvgView(opts);

        // If container is an id, get the element
        if (typeof container === 'string' && container.charAt(0) === '#') {
          container = document.getElementById(container.slice(1));
        }

        container.appendChild(svgView.svg);

        this._path = new Path(svgView.path, opts);
    };

    Progress.prototype.animate = function animate(percent, opts) {
        this._path.animate(percent, opts);
    };

    Progress.prototype.set = function set(percent) {
        this._path.set(percent);
    };

    Progress.prototype._createSvgView = function _createSvgView(opts) {
        opts = extend({
            color: "#555",
            strokeWidth: "0.5",
            trailColor: "#f4f4f4"
        }, opts);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");

        if (opts.trailColor) {
            var trailOpts = extend({}, opts);
            trailOpts.color = opts.trailColor;
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
            easing: "ease-in-out"
        }, opts);

        this._path = path;
        this._opts = opts;

        // Set up the starting positions
        var length = this._path.getTotalLength();
        this._path.style.strokeDasharray = length + ' ' + length;
        this._path.style.strokeDashoffset = length;
    };

    Path.prototype.set = function set(percent) {
        this._path.style.transition = this._path.style.WebkitTransition = 'none';
        this._path.style.strokeDashoffset = length - (percent / 100) * length;
    };

    // Method introduced here:
    // http://jakearchibald.com/2013/animated-line-drawing-svg/
    Path.prototype.animate = function animate(percent, opts) {
        // Copy default opts to new object so defaults are not modified
        var defaultOpts = extend({}, this._opts);
        opts = extend(defaultOpts, opts);

        var length = this._path.getTotalLength();

        // Clear any previous transition
        this._path.style.transition = this._path.style.WebkitTransition = 'none';

        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        this._path.getBoundingClientRect();

        // Animate
        this._path.style.transition = this._path.style.WebkitTransition =
          'stroke-dashoffset ' + opts.duration + 'ms ' + opts.easing;
        this._path.style.strokeDashoffset = length - (percent / 100) * length;
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

    // Expose modules
    root.ProgressBar = {
        Circle: Circle,
        Square: Square,
        Path: Path
    };
})(window);

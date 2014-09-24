(function(root) {

    var browserPrefixes = ['-webkit-', '-moz-', '-o-'];

    var ProgressPath = function(container, opts) {
        opts = extend({
            view: ProgressPath.views.circle
        }, opts);

        var view = isFunction(opts.view)
            ? opts.view(opts)
            : opts.view;
        container.appendChild(view.svg);

        this._opts = opts;
        this._container = container;
        this._svg = view.svg;
        this._path = view.path;

        // Set up the starting positions
        var length = this._path.getTotalLength();
        this._path.style.strokeDasharray = length + ' ' + length;
        this._path.style.strokeDashoffset = length;
    };

    ProgressPath.prototype.animate = function animate(progress, opts) {
        opts = extend({
            duration: 800,
            easing: "ease-in-out"
        }, opts);

        // Method introduced here:
        // http://jakearchibald.com/2013/animated-line-drawing-svg/
        var length = this._path.getTotalLength();

        // Clear any previous transition
        this._path.style.transition = this._path.style.WebkitTransition = 'none';

        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        this._path.getBoundingClientRect();

        // Define our transition
        this._path.style.transition = this._path.style.WebkitTransition =
          'stroke-dashoffset ' + opts.duration + ' ' + opts.easing + 'ms';

        // Animate
        this._path.style.strokeDashoffset = length - (progress / 100) * length;
    }

    ProgressPath.prototype.destroy = function destroy() {
        this._container.removeChild(this._svg);
    }

    // Built-in view functions
    // Each view is a function which returns svg element and path element
    ProgressPath.prototype.views = ProgressPath.views = {};

    ProgressPath.prototype.views.circle = function circle(opts) {
        return _createSvg(opts, _circlePathString);
    };

    ProgressPath.prototype.views.square = function square(opts) {
        return _createSvg(opts, _squarePathString);
    };

    function _circlePathString(opts) {
        // Use two arcs to form a circle
        // See this answer http://stackoverflow.com/a/10477334/1446092
        var pathString = "M 50,50 m 0,-{r} a {r},{r} 0 1 1 0,{r*2} a {r},{r} 0 1 1 0,-{r*2}";
        var r = 50 - opts.strokeWidth / 2;
        pathString = pathString.replace(/\{r\}/g, r);
        pathString = pathString.replace(/\{r\*2\}/g, r * 2);
        return pathString;
    }

    function _squarePathString(opts) {
        var pathString = "M 0,{s/2} L {w},{s/2} L {w},{w} L {s/2},{w} L {s/2},{s}";
        var w = 100 - opts.strokeWidth / 2;
        pathString = pathString.replace(/\{w\}/g, w);
        pathString = pathString.replace(/\{s\}/g, opts.strokeWidth);
        pathString = pathString.replace(/\{s\/2\}/g, opts.strokeWidth / 2);
        return pathString;
    }

    function _createSvg(opts, createPathString) {
        opts = extend({
            color: "#555",
            strokeWidth: "0.5",
            trailColor: "#f4f4f4"
        }, opts);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");

        var pathString = createPathString(opts);
        var trailOpts = extend({}, opts);
        trailOpts.color = opts.trailColor;

        var trailPath = _createPath(pathString, trailOpts);
        var path = _createPath(pathString, opts);
        svg.appendChild(trailPath);
        svg.appendChild(path);

        return {
            svg: svg,
            path: path
        }
    }

    function _createPath(pathString, opts) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", pathString);
        path.setAttributeNS(null, "stroke", opts.color);
        path.setAttributeNS(null, "stroke-width", opts.strokeWidth);

        if (opts.fill) {
            path.setAttributeNS(null, "fill", opts.fill);
        } else {
            path.setAttributeNS(null, "fill-opacity", "0");
        }

        return path;
    }

    // Util functions

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

    function isFunction(obj) {
        return typeof obj === 'function';
    }

    function prefixStyle(style) {
        var prefixes = [];

        for (var i = 0; i < browserPrefixes.length; ++i) {
            prefixes.push(browserPrefixes[i] + style);
        }

        prefixes.push(style);
        return prefixes;
    }

    root.ProgressPath = ProgressPath;
})(window);

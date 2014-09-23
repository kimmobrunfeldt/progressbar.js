;
(function() {

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
            duration: "800ms",
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
          'stroke-dashoffset ' + opts.duration + ' ' + opts.easing;

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
        opts = extend({
            color: "#555",
            strokeWidth: "0.5",
            trailColor: "#f4f4f4",
            trailStrokeWidth: "0.4"
        }, opts);

        // Creates a circle path which fits to 100x100 view box
        function createCirclePath(strokeColor, strokeWidth) {
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            // Use two arcs to form a circle
            // See this answer http://stackoverflow.com/a/10477334/1446092
            var pathString = "M 50,50 m 0,-{r} a {r},{r} 0 1 1 0,{r*2} a {r},{r} 0 1 1 0,-{r*2}";
            var r = 50 - strokeWidth / 2;
            pathString = pathString.replace(/\{r\}/g, r);
            pathString = pathString.replace(/\{r\*2\}/g, r * 2);

            path.setAttributeNS(null, "d", pathString);
            path.setAttributeNS(null, "stroke", strokeColor);
            path.setAttributeNS(null, "stroke-width", strokeWidth);
            path.setAttributeNS(null, "fill-opacity", "0");

            return path;
        }

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");

        var trailPath = createCirclePath(opts.trailColor, opts.trailStrokeWidth);
        svg.appendChild(trailPath);

        var path = createCirclePath(opts.color, opts.strokeWidth);
        svg.appendChild(path);

        return {
            path: path,
            svg: svg
        };
    };

    ProgressPath.prototype.views.square = function square(opts) {
        opts = extend({
            color: "#555",
            strokeWidth: "0.5",
            trailColor: "#f4f4f4",
            trailStrokeWidth: "0.4"
        }, opts);

        // Creates a square path which fits to 100x100 view box
        function createSquarePath(strokeColor, strokeWidth) {
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            // Use two arcs to form a circle
            // See this answer http://stackoverflow.com/a/10477334/1446092
            var pathString = "M 0,{s/2} L {w},{s/2} L {w},{w} L {s/2},{w} L {s/2},{s}";
            var w = 100 - strokeWidth / 2;
            pathString = pathString.replace(/\{w\}/g, w);
            pathString = pathString.replace(/\{s\}/g, strokeWidth);
            pathString = pathString.replace(/\{s\/2\}/g, strokeWidth / 2);

            path.setAttributeNS(null, "d", pathString);
            path.setAttributeNS(null, "stroke", strokeColor);
            path.setAttributeNS(null, "stroke-width", strokeWidth);
            path.setAttributeNS(null, "fill-opacity", "0");

            return path;
        }

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");

        var trailPath = createSquarePath(opts.trailColor, opts.trailStrokeWidth);
        svg.appendChild(trailPath);

        var path = createSquarePath(opts.color, opts.strokeWidth);
        svg.appendChild(path);

        return {
            path: path,
            svg: svg
        };
    };

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

    window.ProgressPath = ProgressPath;
})();

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
    return typeof obj === "function";
}

var PathProgress = function(container, viewNameOrFunction, opts) {
    var view = isFunction(viewNameOrFunction)
        ? viewNameOrFunction(opts)
        : this.views[viewNameOrFunction](opts);

    container.appendChild(view.svg);

    this._opts = opts;
    this._path = view.path;
};


PathProgress.prototype.set = function set(progress, opts) {
    opts = extend(opts, {
        duration: "600ms",
        easing: "ease-in-out"
    });

    // Method introduced here:
    // http://jakearchibald.com/2013/animated-line-drawing-svg/
    var length = this._path.getTotalLength();

    // Clear any previous transition
    this._path.style.transition = this._path.style.WebkitTransition = 'none';

    // Set up the starting positions
    this._path.style.strokeDasharray = length + ' ' + length;
    this._path.style.strokeDashoffset = length;

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this._path.getBoundingClientRect();

    // Define our transition
    this._path.style.transition = this._path.style.WebkitTransition =
      'stroke-dashoffset ' + opts.duration + ' ' + opts.easing;

    // Animate
    this._path.style.strokeDashoffset = length - (progress / 100) * length;
}

// Each view is a function which returns svg element and path element
PathProgress.prototype.views = {};

PathProgress.prototype.views.circle = function circle(opts) {

    // Creates a circle path which fits to 100x100 view box
    function createCirclePath(strokeColor, strokeWidth) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Use two arcs to form a circle
        // See this answer http://stackoverflow.com/a/10477334/1446092
        var pathString = "M 50,50 m 0,-{r} a {r},{r} 0 1 1 0,{r*2} a {r},{r} 0 1 1 0,-{r*2}";
        var r = 50 - strokeWidth / 2;
        console.log(r, r*2)
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

    var path = createCirclePath("#555", 45);
    svg.appendChild(path);

    return {
        path: path,
        svg: svg
    };
};


var element = document.getElementById("progress-container");
var progress = new PathProgress(element, "circle");
progress.set(100);

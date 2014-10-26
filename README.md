# ProgressBar.js

<br>
![Beautiful animation](docs/animation.gif)

<br>
Beautiful and responsive progress bars with animated SVG paths.
[Use built-in shapes](#api) or [create your own paths](#pathpath-options).
[Customize](#custom-animations) the animations as you wish.

See [**demo page**](https://kimmobrunfeldt.github.io/progressbar.js) for examples or
[**try it in JSFiddle**](http://jsfiddle.net/kimmobrunfeldt/8xa87k31/).


# Get started

*ProgressBar.js* is lightweight, MIT licensed and supports all major browsers including **IE9+**.

#### Installing options:

* Using bower

        bower install progressbar.js

* Using npm

        npm install progressbar.js

* Including [*dist/progressbar.js*](dist/progressbar.js) or [dist/progressbar.min.js](dist/progressbar.min.js) from latest tag to your project.

#### Loading module

Files in `dist/` folder are UMD modules built with Browserify's `--standalone` switch. Read more about [standalone Browserify builds](http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds).

CommonJS

```javascript
var ProgressBar = require('progressbar.js')
var line = new ProgressBar.Line('#container');
```

AMD

```javascript
require.config({
    paths: {"progressbar": "../bower_components/progressbar.js/dist/progressbar"}
});

define(['progressbar'], function(ProgressBar) {
    var line = new ProgressBar.Line('#container');
});
```

Global variable

```javascript
// If you aren't using any module loader, progressbar.js exposes
// global variable: window.ProgressBar
var line = new ProgressBar.Line('#container');
```


# How it works

Progress bars are just regular SVG paths.
Read [Jake Archibald's blog post](http://jakearchibald.com/2013/animated-line-drawing-svg/) to see how the path drawing works under the hood.

*ProgressBar.js* uses [shifty](https://jeremyckahn.github.io/shifty/) tweening library to animate path drawing.
So in other words, animation is done with JavaScript using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).
Animating with JS gives more control over the animation and is supported across major browsers. For example IE [does not support](https://connect.microsoft.com/IE/feedbackdetail/view/920928/ie-11-css-transition-property-not-working-for-svg-elements)
animating SVG properties with CSS transitions.


# API

[**ProgressBar**](#api)

* [Line(container, [*options*])](#linecontainer-options)
    * [*path*](#linepath)
    * [*trail*](#linetrail)
    * [animate(progress, [*options*], [*cb*])](#lineanimateprogress-options-cb)
    * [stop()](#linestop)
    * [set(progress)](#linesetprogress)


* [Circle(container, [*options*])](#circlecontainer-options)
    * [*path*](#circlepath)
    * [*trail*](#circletrail)
    * [animate(progress, [*options*], [*cb*])](#circleanimateprogress-options-cb)
    * [stop()](#circlestop)
    * [set(progress)](#circlesetprogress)


* [Square(container, [*options*])](#squarecontainer-options)
    * [*path*](#squarepath)
    * [*trail*](#squaretrail)
    * [animate(progress, [*options*], [*cb*])](#squareanimateprogress-options-cb)
    * [stop()](#squarestop)
    * [set(progress)](#squaresetprogress)


* [Path(path, [*options*])](#pathpath-options)
    * [animate(progress, [*options*], [*cb*])](#pathanimateprogress-options-cb)
    * [stop()](#pathstop)
    * [set(progress)](#pathsetprogress)

Functions use node-style callback convention. Callback function is always the last given parameter.

All built-in shapes except [Line](#linecontainer-options) are drawn on 100x100 SVG canvas and the shape is fitted exactly to the canvas.
Line is drawn on 100-width canvas and height depends on the stroke width.


## Line(container, [*options*])

Line shaped progress bar. Appends SVG to container.

**Example**

```javascript
var progressBar = new ProgressBar.Line('#container', {
    strokeWidth: 2
});
```

To make line resize with its container, set for example the following CSS:

```css
.container > svg {
    display: block;
    width: 100%;
}
```

**Parameters**

* `container` Element where SVG is added. Query string or element.

    For example `"#container"` or `document.getElementById("#container")`

* `options` Options for path drawing.

    ```javascript
    {
        // Stroke color.
        // Default: "#555"
        color: "#3a3a3a",

        // Width of the stroke.
        // Unit is percentage of SVG canvas' size.
        // Default: 1.0
        strokeWidth: 0.1,

        // Color for lighter trail stroke
        // underneath the actual progress path.
        // If null, trail path is not drawn
        // Default: null
        trailColor: "#f4f4f4",

        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeIn",

        // See #custom-animations section
        // Built-in shape passes reference to itself as attachment
        // to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, line) {
            line.path.setAttribute('stroke', state.color);
        }
    }
    ```

## Line.path

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which represents the actual progress bar.

## Line.trail

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which represents the trail of the progress bar.
Returns `null` if trail is not defined.

## Line.animate(progress, [*options*], [*cb*])

Animates drawing of line.

**Example**

```javascript
progressBar.animate(0.3, {
    duration: 800
}, function() {
    console.log('Animation has finished');
});
```

**Parameters**

* `progress` progress from 0 to 1.
* `options` Animation options. These options override the defaults given in initialization.

    ```javascript
    {
        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeOut",

        // See #custom-animations section
        // Built-in shape passes reference to itself as attachment
        // to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, line) {
            line.path.setAttribute('stroke', state.color);
        }
    }
    ```

* `cb` Callback function which is called after transition ends.

## Line.stop()

Stops animation to its current position.

## Line.set(progress)

Sets progress instantly without animation. Clears all transitions
for path.

<br>
<br>


## Circle(container, [*options*])

Circle shaped progress bar. Appends SVG to container.

**Example**

```javascript
var progressBar = new ProgressBar.Circle('#container', {
    strokeWidth: 2
});
```

To make circle resize with its container, set for example the following CSS:

```css
.container > svg {
    display: block;
    width: 100%;
}
```

**Parameters**

* `container` Element where SVG is added. Query string or element.

    For example `"#container"` or `document.getElementById("#container")`

* `options` Options for path drawing.

    ```javascript
    {
        // Stroke color.
        // Default: "#555"
        color: "#3a3a3a",

        // Width of the stroke.
        // Unit is percentage of SVG canvas' size.
        // Default: 1.0
        strokeWidth: 0.1,

        // Color for lighter trail stroke
        // underneath the actual progress path.
        // If null, trail path is not drawn
        // Default: null
        trailColor: "#f4f4f4",

        // Fill color for the shape. If null, no fill.
        // Default: null
        fill: "rgba(0, 0, 0, 0.5)",

        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeIn",

        // See #custom-animations section
        // Built-in shape passes reference to itself as attachment
        // to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }
    }
    ```

## Circle.path

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which presents the actual progress bar.

## Circle.trail

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which presents the trail of the progress bar.
Returns `null` if trail is not defined.

## Circle.animate(progress, [*options*], [*cb*])

Animates drawing of circle.

**Example**

```javascript
progressBar.animate(0.3, {
    duration: 800
}, function() {
    console.log('Animation has finished');
});
```

**Parameters**

* `progress` progress from 0 to 1.
* `options` Animation options. These options override the defaults given in initialization.

    ```javascript
    {
        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeOut",

        // See #custom-animations section
        // Built-in shape passes reference to itself as attachment
        // to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }
    }
    ```

* `cb` Callback function which is called after transition ends.

## Circle.stop()

Stops animation to its current position.

## Circle.set(progress)

Sets progress instantly without animation. Clears all transitions
for path.

<br>
<br>

## Square(container, [*options*])

Square shaped progress bar. Appends SVG to container.

**Example**

```javascript
var progressBar = new ProgressBar.Square('#container', {
    strokeWidth: 2
});
```

To make square resize with its container, set for example the following CSS:

```css
.container > svg {
    display: block;
    width: 100%;
}
```

**Parameters**

* `container` Element where SVG is added. Query string or element.

    For example `"#container"` or `document.getElementById("#container")`

* `options` Options for path drawing.

    ```javascript
    {
        // Stroke color.
        // Default: "#555"
        color: "#3a3a3a",

        // Width of the stroke.
        // Unit is percentage of SVG canvas' size.
        // Default: 1.0
        strokeWidth: 0.1,

        // Color for lighter trail stroke
        // underneath the actual progress path.
        // If null, trail path is not drawn
        // Default: null
        trailColor: "#f4f4f4",

        // Fill color for the shape. If null, no fill.
        // Default: null
        fill: "rgba(0, 0, 0, 0.5)",

        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeOut",

        // See #custom-animations section
        // Built-in shape passes reference to itself as attachment
        // to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, square) {
            square.path.setAttribute('stroke', state.color);
        }
    }
    ```

## Square.path

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which presents the actual progress bar.

## Square.trail

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which presents the trail of the progress bar.
Returns `null` if trail is not defined.

## Square.animate(progress, [*options*], [*cb*])

Animates drawing of square.

**Example**

```javascript
progressBar.animate(0.3, {
    duration: 800
}, function() {
    console.log('Animation has finished');
});
```

**Parameters**

* `progress` progress from 0 to 1.
* `options` Animation options. These options override the defaults given in initialization.

    ```javascript
    {
        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeInOut",

        // See #custom-animations section
        // Built-in shape passes reference to itself as attachment
        // to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, square) {
            square.path.setAttribute('stroke', state.color);
        }
    }
    ```

* `cb` Callback function which is called after transition ends.

## Square.stop()

Stops animation to its current position.

## Square.set(progress)

Sets progress instantly without animation. Clears all transitions
for path.

<br>
<br>

## Path(path, [*options*])

Custom shaped progress bar. You can create arbitrary shaped progress bars by
passing a SVG path created with e.g. Adobe Illustrator. It's on caller's responsibility to append SVG to DOM.

**Example**

Assuming there was SVG object with heart shaped path in HTML

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
    <path fill-opacity="0" stroke-width="0.5" stroke="#f4f4f4" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
    <path id="heart-path" fill-opacity="0" stroke-width="0.6" stroke="#555" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
</svg>
```

Initialization would be this easy

```javascript
var svgPath = document.getElementById("heart-path");
var path = new ProgressBar.Path(svgPath, {
    duration: 300
});
```

**Working with embedded SVG**

If the SVG was not inline in the HTML but instead in, say, an `<object>` tag, we'd have to take extra steps to wait until it has loaded and then access it differently since it's in a separate DOM tree. Given e.g.:

```html
<object id="heart" type="image/svg+xml" data="heart.svg">No SVG support :(</object>
```

we could do

```javascript
var heart = document.getElementById('heart');
heart.addEventListener('load', function () {
var path = new ProgressBar.Path(heartObject.contentDocument.querySelector('#heart-path'), {
    duration: 300
});
```

**Parameters**

* `path` [SVG Path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) object. For example `$('svg > path:first-child')[0]`.
* `options` Animation options.

    ```javascript
    {
        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeIn",

        // Attachment which can be any object
        // you need to modify within the step function.
        // Passed as a parameter to step function.
        // Default: undefined
        attachment: document.querySelector('#container > svg'),

        // See #custom-animations section
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, attachment) {
            // Do any modifications to attachment attributes
        }
    }
    ```

## Path.animate(progress, [*options*], [*cb*])

Animates drawing of path.

**Example**

```javascript
path.animate(0.3, {
    duration: 800
}, function() {
    console.log('Animation has finished');
});
```

**Parameters**

* `progress` progress from 0 to 1.
* `options` Animation options. These options override the defaults given in initialization.

    ```javascript
    {
        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: "linear"
        easing: "easeOut",

        // Attachment which can be any object
        // you need to modify within the step function.
        // Passed as a parameter to step function.
        // Default: undefined
        attachment: document.querySelector('#container > svg'),

        // See #custom-animations section
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, attachment) {
            // Do any modifications to attachment attributes
        }
    }
    ```

* `cb` Callback function which is called after transition ends.

## Path.stop()

Stops animation to its current position.

## Path.set(progress)

Set progress instantly without animation. Clears all transitions
for path.

<br>
<br>

# Parameters in detail

## Easing

Easing functions [provided with *shifty* are supported](https://github.com/jeremyckahn/shifty/blob/master/src/shifty.formulas.js).

A few basic easing options:

* `"linear"`
* `"easeIn"`
* `"easeOut"`
* `"easeInOut"`

# Custom animations

See [example in demo page](https://kimmobrunfeldt.github.io/progressbar.js#example-custom-animation).

Customizing animations is possible with the help of `from`, `to` and `step` parameters.
Tweening engine changes defined values over time and calls step function for each animation's frame.

* `from` Object containing values which should be tweened.
 These values represent the starting values of the animation. Default: `{}`.

    For example

    ```javascript
    {
        // Start from thin gray line
        width: 0.1,
        color: "#eee"
    }
    ```

    Thanks to shifty, you can tween values in formats like `translateX(45px)`, `rgb(0,255,0)` and `#fff`.
    See all supported string formats from [shifty's documentation](http://jeremyckahn.github.io/shifty/dist/doc/src/shifty.token.js.html#token)

    Easing defined as option for animation applies to all of the specified values.

* `to` Object containing values which should be tweened. These represent the final values after animation is done. Default: `{}`.

    For example

    ```javascript
    {
        // Finish to thick black line
        width: 1,
        color: "#000"
    }
    ```

    *Signature must match `from`*

* `step` Function called for each animation step. Tweened values and reference to attachment are passed as parameters. Attachment can be reference to any object you need to modify within step function. Built-in shapes pass references to their selves as attachment. Default: `function() {}`.

    **This function is called multiple times per second.
    To make sure animations run smoothly, keep it minimal.**

    For example

    ```javascript
    function(state, attachment) {
        attachment.path.setAttribute('stroke-width', state.width);
        attachment.path.setAttribute('stroke', state.color);
    }
    ```

# Contributing

See [documentation for contributors](CONTRIBUTING.md).

# ProgressBar.js

**Version: 0.9.0** ([*previous stable*](https://github.com/kimmobrunfeldt/progressbar.js/tree/0.8.1))

<br>
![Demo animation](docs/animation.gif)

<br>
Responsive and slick progress bars with animated SVG paths.
Use built-in shapes or [create your own paths](#pathpath-options).
[Customize](#custom-animations) the animations as you wish.


**Shortcuts**

* [How to install](#installing-options)
* [Demo & Examples](https://kimmobrunfeldt.github.io/progressbar.js)
* [**Try** in JSFiddle](http://jsfiddle.net/kimmobrunfeldt/8xa87k31/392/)
* [API documentation](#api)

**Build status**

[![Build Status](https://api.travis-ci.org/kimmobrunfeldt/progressbar.js.svg?branch=master)](https://travis-ci.org/kimmobrunfeldt/progressbar.js) *Build status and browser tests for current master*

[![Sauce Test Status](https://saucelabs.com/browser-matrix/kimmobrunfeldt.svg)](https://saucelabs.com/u/kimmobrunfeldt)


# Get started

*ProgressBar.js* is lightweight, MIT licensed and supports all major browsers including **IE9+**.
See complete examples in [examples](#examples) section.

#### Installing options:

* Using bower

        bower install progressbar.js

* Using npm

        npm install progressbar.js

* Including [*dist/progressbar.js*](dist/progressbar.js) or [dist/progressbar.min.js](dist/progressbar.min.js) from latest tag to your project.

#### Loading module

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

Files in `dist/` folder are UMD modules built with Browserify's `--standalone` switch. Read more about [standalone Browserify builds](http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds).


# How it works

Progress bars are just regular SVG paths.
Read [Jake Archibald's blog post](http://jakearchibald.com/2013/animated-line-drawing-svg/) to see how the path drawing works under the hood.

*ProgressBar.js* uses [shifty](https://jeremyckahn.github.io/shifty/) tweening library to animate path drawing.
So in other words, animation is done with JavaScript using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).
Animating with JS gives more control over the animation and is supported across major browsers. For example IE [does not support](https://connect.microsoft.com/IE/feedbackdetail/view/920928/ie-11-css-transition-property-not-working-for-svg-elements)
animating SVG properties with CSS transitions.


# API

**NOTE:** Line, Circle and SemiCircle all point to the same
documentation which is named Shape. You almost certainly should
replace it(Shape) with Line, Circle or SemiCircle.

**Example:** if documentation states `Shape.animate()`, replace it with
`Circle.animate()`, simple. Shape is the base object for all
progress bars and currently undocumented internal module.

[**ProgressBar**](#api)

* [Line(container, [*options*])](#shapecontainer-options)
    * [*svg*](#shapesvg)
    * [*path*](#shapepath)
    * [*trail*](#shapetrail)
    * [*text*](#shapetext)
    * [animate(progress, [*options*], [*cb*])](#shapeanimateprogress-options-cb)
    * [set(progress)](#shapesetprogress)
    * [stop()](#shapestop)
    * [value()](#shapevalue)
    * [setText(text)](#shapesettexttext)
    * [destroy()](#shapedestroy)


* [Circle(container, [*options*])](#shapecontainer-options)
    * [*svg*](#shapesvg)
    * [*path*](#shapepath)
    * [*trail*](#shapetrail)
    * [*text*](#shapetext)
    * [animate(progress, [*options*], [*cb*])](#shapeanimateprogress-options-cb)
    * [set(progress)](#shapesetprogress)
    * [stop()](#shapestop)
    * [value()](#shapevalue)
    * [setText(text)](#shapesettexttext)
    * [destroy()](#shapedestroy)


* [SemiCircle(container, [*options*])](#shapecontainer-options)
    * [*svg*](#shapesvg)
    * [*path*](#shapepath)
    * [*trail*](#shapetrail)
    * [*text*](#shapetext)
    * [animate(progress, [*options*], [*cb*])](#shapeanimateprogress-options-cb)
    * [set(progress)](#shapesetprogress)
    * [stop()](#shapestop)
    * [value()](#shapevalue)
    * [setText(text)](#shapesettexttext)
    * [destroy()](#shapedestroy)


* [Path(path, [*options*])](#pathpath-options)
    * [*path*](#pathpath)
    * [animate(progress, [*options*], [*cb*])](#pathanimateprogress-options-cb)
    * [set(progress)](#pathsetprogress)
    * [stop()](#pathstop)
    * [value()](#pathvalue)

Functions use node-style callback convention. Callback function is always the last given parameter.

Shapes have different SVG canvas sizes:

Shape      | Canvas size
-----------|------------------------
Circle     | `100x100`
SemiCircle | `100x50`
Line       | `100x{opts.strokeWidth}`

All shapes are fitted exactly to their canvases.

**Important:** make sure that your container has same aspect ratio
as the SVG canvas. For example: if you are using SemiCircle,
set e.g.

```css
#container {
    width: 300px;
    height: 150px;
}
```

## Shape(container, [*options*])

Line, Circle or SemiCircle shaped progress bar. Appends SVG to container.

**Example**

```javascript
var progressBar = new ProgressBar.Circle('#container', {
    strokeWidth: 2
});
```

With Line shape, you can control the width of the line by specifying e.g. `height: 5px`
with CSS.

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
        strokeWidth: 2.1,

        // If trail options are not defined, trail won't be drawn

        // Color for lighter trail stroke
        // underneath the actual progress path.
        // Default: '#eee'
        trailColor: "#f4f4f4",

        // Width of the trail stroke. Trail is always centered relative to
        // actual progress path.
        // Default: same as strokeWidth
        trailWidth: 0.8,

        // Inline CSS styles for the created SVG element
        // Set null to disable all default styles.
        // You can disable individual defaults by setting them to `null`.
        svgStyle: {
            display: 'block',

            // Important: make sure that your container has same
            // aspect ratio as the SVG canvas. See SVG canvas sizes above.
            width: '100%'
        },

        // Text options. Text element is a <p> element appended to container
        // You can add CSS rules for the text element with the className
        // NOTE: When text is set, 'position: relative' will be set to the
        // container for centering. You can also prevent all default inline
        // styles with 'text.style: null'
        // Default: null
        text: {
            // Initial value for text.
            // Default: null
            value: 'Text',

            // Class name for text element.
            // Default: 'progressbar-text'
            className: 'progressbar__label',

            // Inline CSS styles for the text element.
            // If you want to modify all CSS your self, set null to disable
            // all default styles.
            // You can disable individual defaults by setting them to `null`.
            // If the style option contains values, container is automatically
            // set to position: relative.
            // Default: object speficied below
            style: {
                // Text color.
                // Default: same as stroke color (options.color)
                color: '#f00',
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0,
                // You can specify styles which will be browser prefixed
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }
            },

            // Only effective if the shape is SemiCircle.
            // If true, baseline for text is aligned with bottom of
            // the SVG canvas. If false, bottom line of SVG canvas
            // is in the center of text.
            // Default: true
            alignToBottom: true
        },

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
        // Built-in shape passes reference to itself and a custom attachment
        // object to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, circle, attachment) {
            circle.path.setAttribute('stroke', state.color);
        }
    }
    ```

## Shape.svg

Reference to [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) element where progress bar is drawn.

## Shape.path

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which presents the actual progress bar.

## Shape.trail

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which presents the trail of the progress bar.
Returns `null` if trail is not defined.

## Shape.text

Reference to [p element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) which presents the text label for progress bar.
Returns `null` if text is not defined.

## Shape.animate(progress, [*options*], [*cb*])

Animates drawing of a shape.

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
        // Built-in shape passes reference to itself and a custom attachment
        // object to step function
        from: { color: '#eee' },
        to: { color: '#000' },
        step: function(state, circle, attachment) {
            circle.path.setAttribute('stroke', state.color);
        }
    }
    ```

* `cb` Callback function which is called after animation ends.

## Shape.set(progress)

Sets progress instantly without animation. Clears all animations
for path.

## Shape.stop()

Stops animation to its current position.

## Shape.value()

Returns current shown progress from 0 to 1. This value changes when animation is running.

## Shape.setText(text)

Sets text to given a string. If you need to dynamically modify the text element,
see [.text](#shapetext) attribute.

## Shape.destroy()

Removes SVG element from container and removes all references to DOM elements. Destroying is irreversible.

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
        step: function(state, path, attachment) {
            // Do any modifications to attachment and/or path attributes
        }
    }
    ```

## Path.path

Reference to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) which presents the actual progress bar.

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
        step: function(state, path, attachment) {
            // Do any modifications to attachment and/or path attributes
        }
    }
    ```

* `cb` Callback function which is called after transition ends.

## Path.set(progress)

Set progress instantly without animation. Clears all transitions
for path.

## Path.stop()

Stops animation to its current position.

## Path.value()

Returns current shown progress from 0 to 1. This value changes when animation is running.

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
    See all supported string formats from [shifty's documentation](http://jeremyckahn.github.io/shifty/dist/doc/modules/Tweenable.token.html)

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

* `step` Function called for each animation step. Tweened values, a reference to the path or shape, and an attachment are passed as parameters. Attachment can be reference to any object you need to modify within step function. Default: `function() {}`.

    **This function is called multiple times per second.
    To make sure animations run smoothly, keep it minimal.**

    For example

    ```javascript
    function(state, shape, attachment) {
        shape.path.setAttribute('stroke-width', state.width);
        shape.path.setAttribute('stroke', state.color);
        attachment.text.innerHTML = shape.value()*100;
    }
    ```

**Note:** There's a big difference between passing the `from` and `to` parameters in initialization
of progress bar compared to passing in `.animate()` call. Here's example code and illustrations to explain the difference:

**Pass in initialization**

```javascript
var bar = new ProgressBar.Line('#container', {
    from: { color: '#000 '},
    to: { color: '#888 '},
    step: function(state, bar, attachment) {
        bar.path.setAttribute('stroke', state.color);
    }
});
```

![](docs/animate-init.png)


**Pass in `.animate()` call**

```javascript
var bar = new ProgressBar.Line('#container', {
    step: function(state, bar, attachment) {
        bar.path.setAttribute('stroke', state.color);
    }
});

var opts = {
    from: { color: '#000 '},
    to: { color: '#888 '}
};
bar.animate(0.5, opts);
```

![](docs/animate-call.png)


## Examples

* [**Minimal**](http://kimmobrunfeldt.github.io/progressbar.js/examples/minimal/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/minimal)
* [**File upload**](http://kimmobrunfeldt.github.io/progressbar.js/examples/upload/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/upload)
* [**Telegram**](http://kimmobrunfeldt.github.io/progressbar.js/examples/telegram/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/telegram)
* [**Password strength**](http://kimmobrunfeldt.github.io/progressbar.js/examples/password-strength/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/password-strength)

# Contributing

See [documentation for contributors](CONTRIBUTING.md).

# Thanks

This project is a grateful recipient of the [Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities?utm_source=github&utm_medium=spice&utm_campaign=progressbar).

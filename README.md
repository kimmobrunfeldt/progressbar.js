# Progresspath

Create beautiful and responsive progress bars with animated SVG paths.

![Beautiful animation](demo/animation.gif)


# API

[**ProgressPath**](#-progresspathcontainer-options)

* [animate(progress, options)](#-animateprogress-options)
* [destroy()](#-destroy)
* [views](#-views)
    * [circle(options)](#-viewscircleoptions)
    * [square(options)](#-viewssquareoptions)


## # ProgressPath(container, options)

`ProgressPath` object.

**Parameters**

* `container` Element where SVG is added.

* `options` Options for path drawing.

    ```javascript
    {
        // Stroke color.
        // Default: "#555"
        color: "#555",

        // Width of the stroke.
        // Unit is percentage of SVG canvas.
        // Default: "0.5"
        strokeWidth: "0.5",

        // Color for lighter trail stroke
        // underneath the actual progress path.
        // Default: "#f4f4f4"
        trailColor: "#f4f4f4",

        // Fill color for the shape. If undefined, no fill.
        // Default: undefined
        fill: "rgba(0, 0, 0, 0.5)",

        // View or function which returns a view.
        view: PathProgress.view.circle
    }
    ```

    View is representation of the progress "scenario". It consists of two
    elements: SVG and path. Path object will be animated as if its stroke was drawn.

    Example of view object:

    ```javascript
    {
        svg: document.getElementById('circle-svg'),
        path: document.getElementById('circle-path'),
    }
    ```

    See [views](#-views) section for built-in views.


**Example**

```javascript
var container = document.getElementById('progress');
var progress = new ProgressPath(container, {
    strokeWidth: 2,
    ProgressPath.views.square
});
```

<br>

## # .animate(progress, options)

Animates drawing of progress path.

**Parameters**

* `progress` Progress from 0 to 100.
* `options` Animation options.

    ```javascript
    {
        // Animation duration in milliseconds
        duration: 800,

        // Easing for animation.
        // CSS3 easing values are supported.
        easing: "ease-in-out"
    }
    ```

**Example**

```javascript
progress.animate(30, {
    duration: 800
});
```

<br>

## # .destroy()

Removes SVG object from given container.


## # .views

All built-in view functions are inside `ProgressPath.views` object.
Built-in SVGs are drawn to a 100x100 canvas and the paths inside will fill
the whole canvas. This allows views to be scaled according to their containers.

Options given in the initialization of `ProgressPath` will be passed to view functions.

## # .views.circle(options)

Circle progress bar.

## # .views.square(options)

Square progress bar.

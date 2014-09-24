# Progresspath

Create beautiful and responsive progress bars with animated SVG paths.

![Beautiful animation](demo/animation.gif)


# API

## # ProgressPath(container, options)

Initializes a new `ProgressPath` object.

**Parameters**

* `container` Element where SVG is added.

* `options` Options for path drawing.

    ```javascript
    {
        // Stroke color.
        color: "#555",

        // Width of the stroke.
        // Unit is percentage of SVG canvas.
        strokeWidth: "0.5",

        // Color for lighter trail stroke
        // underneath the actual progress path.
        trailColor: "#f4f4f4",

        // Fill color for the shape
        fill: "rgba(0, 0, 0, 0.5)"
    }
    ```

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

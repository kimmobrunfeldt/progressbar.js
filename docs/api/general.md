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

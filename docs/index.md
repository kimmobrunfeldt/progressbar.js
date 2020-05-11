# Get started

*ProgressBar.js* is lightweight, MIT licensed and supports all major browsers including **IE11+** when using a polyfill.
See complete examples in [full examples](#full-examples) section.

### IE 11 compatibility

You can include ES6 polyfills by adding to your index.html:

```
<script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
```

See https://github.com/jeremyckahn/shifty#ie-compatibility and https://polyfill.io/v3/url-builder/.

#### {install} Installing

* Using bower `bower install progressbar.js`
* Using npm `npm install progressbar.js`
* Including [*dist/progressbar.js*](https://github.com/kimmobrunfeldt/progressbar.js/blob/master/dist/progressbar.js) or [dist/progressbar.min.js](https://github.com/kimmobrunfeldt/progressbar.js/blob/master/dist/progressbar.min.js) from latest tag to your project.

#### Loading module

CommonJS

```javascript
const ProgressBar = require('progressbar.js')
const line = new ProgressBar.Line('#container');
```

AMD

```javascript
require.config({
    paths: {'progressbar': '../bower_components/progressbar.js/dist/progressbar'}
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


## {migrations} Migration guide

To upgrade from version x to y:

* Go to [releases page](https://github.com/kimmobrunfeldt/progressbar.js/releases)
* Find the version x you are using
* Browse through release notes from x to y. API breaking releases are marked with `#breaking`.
* Fix your current code to use new API

*If you find this very tedious, please open a new issue.*

## {full-examples} Full examples

* [**Minimal**](http://kimmobrunfeldt.github.io/progressbar.js/examples/minimal/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/minimal)
* [**File upload**](http://kimmobrunfeldt.github.io/progressbar.js/examples/upload/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/upload)
* [**Telegram**](http://kimmobrunfeldt.github.io/progressbar.js/examples/telegram/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/telegram)
* [**Password strength**](http://kimmobrunfeldt.github.io/progressbar.js/examples/password-strength/) [*see code*](https://github.com/kimmobrunfeldt/progressbar.js/tree/gh-pages/examples/password-strength)

# Contributing

See [documentation for contributors](contributing/).

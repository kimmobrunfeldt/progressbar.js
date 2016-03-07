const _debounce = require('lodash.debounce');
const redSemiCircleText = require('./examples/red-semi-circle-text');

function onLoad() {

  var demoBar = redSemiCircleText('#intro-demo');
  setTimeout(() => demoBar.animate(1), 800);
}

window.onload = onLoad;

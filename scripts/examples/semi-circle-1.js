// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/bs8ane6m/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.SemiCircle(container, {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });

  return bar;
}

module.exports = create;

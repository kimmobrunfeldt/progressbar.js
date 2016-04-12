// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/rfny4ftb/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'}
  });

  return bar;
}

module.exports = create;

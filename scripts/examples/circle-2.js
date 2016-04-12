// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/3pxvkq2d/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Circle(container, {
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    duration: 1400,
    easing: 'bounce',
    strokeWidth: 6,
    from: {color: '#FFEA82', a:0},
    to: {color: '#ED6A5A', a:1},
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
    }
  });

  return bar;
}

module.exports = create;

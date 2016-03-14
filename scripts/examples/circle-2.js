var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Circle(container, {
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    duration: 1400,
    easing: 'bounce',
    strokeWidth: 6,
    from: {color: '#FFEA82'},
    to: {color: '#ED6A5A'},
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
    }
  });

  return bar;
}

module.exports = create;

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Circle(container, {
    strokeWidth: 4,
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

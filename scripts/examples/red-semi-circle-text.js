var ProgressBar = require('progressbar.js');

function create(container) {
  var semiCircle = new ProgressBar.SemiCircle(container, {
    strokeWidth: 5,
    easing: 'easeInOut',
    duration: 1300,
    color: '#FF4365',
    trailColor: '#F4F4F4',
    trailWidth: 2,
    from: {color: '#F4F4F4'},
    to: {color: '#FF4365'},
    step: (state, bar) => {
      var value = bar.value();
      bar.setText(Math.round(value * 100));
      bar.text.style.color = state.color;
    },
    // Define all in CSS
    svgStyle: null,
    text: {
      style: {
        marginBottom: '-10px'
      }
    }
  });

  return semiCircle;
}

module.exports = create;

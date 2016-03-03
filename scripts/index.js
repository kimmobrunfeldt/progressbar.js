var ProgressBar = require('progressbar.js');

function onLoad() {
  var semiCircle = new ProgressBar.SemiCircle('#example', {
    strokeWidth: 5,
    easing: 'easeInOut',
    duration: 800,
    color: '#FF4365',
    step: (state, bar) => {
      bar.setText(bar.value());
    }
  });
  semiCircle.animate(1);
}

window.onload = onLoad;

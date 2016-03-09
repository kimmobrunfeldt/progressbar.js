const _ = {
  map: require('lodash.map'),
  forEach: require('lodash.foreach')
};
const ProgressBar = require('progressbar.js');
const introSquare = require('./examples/intro-square');
const introCircle = require('./examples/intro-circle');
const introTriangle = require('./examples/intro-triangle');

function onLoad() {
  const createBars = [introSquare, introCircle, introTriangle];
  const introBars = _.map(createBars, (createBar, i) => {
    return createBar('#intro-demo' + (i + 1));
  });

  setTimeout(() => {
    playIntroDemo(introBars);

    setInterval(() => {
      _.forEach(introBars, bar => bar.set(0));
      playIntroDemo(introBars);
    }, 4000);

  }, 1500);

  var loadingBar = createLoadingBar();
  playFakeLoadingDemo(loadingBar)
}

function playIntroDemo(introBars) {
  _.forEach(introBars, bar => bar.animate(1));
  var triangle = introBars[2];

  setTimeout(() => {
    triangle.path.style['stroke-linecap'] = 'round';
  }, 100);
}

function playFakeLoadingDemo(loadingBar) {
  setTimeout(() => loadingBar.animate(0.1), 20);
  setTimeout(() => {
    loadingBar.animate(1.0, {
      duration: 500,
      easing: 'easeIn'
    })
  }, 500);
  setTimeout(() => loadingBar.set(0), 1200);
}

function createLoadingBar() {
  return new ProgressBar.Line('#loading-bar', {
    color: '#0FA0CE',
    svgStyle: {
      width: '100%',
      height: '100%',
      display: 'block'
    }
  });
}

window.onload = onLoad;

const _ = {
  map: require('lodash.map'),
  forEach: require('lodash.foreach'),
  throttle: require('lodash.throttle')
};
const Visibility = require('visibilityjs');
const Slideout = require('slideout');
const ProgressBar = require('progressbar.js');
window.ProgressBar = ProgressBar;
const util = require('./util');
const introSquare = require('./examples/intro-square');
const introCircle = require('./examples/intro-circle');
const introTriangle = require('./examples/intro-triangle');
const initializeExamples = require('./init-examples');

initSlideout();
Visibility.onVisible(main);
function main() {
  // Create a fake loading bar, just for a demo. :)
  var loadingBar = createLoadingBar();
  playFakeLoadingDemo(loadingBar)

  const playIntro = initializeIntro();
  const playExamples = initializeExamples();

  setTimeout(() => {
    playIntro();
    playExamples();
  }, 2000);
}

function initSlideout() {
  var slideout = new Slideout({
    menu: document.getElementById('side-menu'),
    panel: document.getElementById('content'),
    padding: 0,
    tolerance: 50
  });
  window.slideout = slideout;

  const hamburgerButton = document.querySelector('.side-menu-toggle');
  const throttledToggle = _.throttle(slideout.toggle.bind(slideout), 600);
  hamburgerButton.addEventListener('click', throttledToggle);

  slideout.on('beforeopen', () => {
    util.addClass(hamburgerButton, 'is-active')
  });

  slideout.on('beforeclose', () => {
    util.removeClass(hamburgerButton, 'is-active')
  });
}

function initializeIntro() {
  const createBars = [introSquare, introCircle, introTriangle];
  const introBars = _.map(createBars, (createBar, i) => {
    return createBar('#intro-demo' + (i + 1));
  });

  setInterval(() => {
    _.forEach(introBars, bar => bar.set(0));
    playIntroDemo(introBars);
  }, 5000);

  return () => playIntroDemo(introBars);
}

function playIntroDemo(introBars) {
  _.forEach(introBars, bar => bar.animate(1));
  var triangle = introBars[2];

  setTimeout(() => {
    triangle.path.style['stroke-linecap'] = 'round';
  }, 100);
}

function playFakeLoadingDemo(loadingBar) {
  const textShown = checkOrSetFlag();
  if (!textShown) {
    var textElement = document.querySelector('.top-loading-bar-tip');
    util.removeClass(textElement, 'hidden');
    util.addClass(textElement, 'visible');
  }

  setTimeout(() => loadingBar.animate(0.1), 500);
  setTimeout(() => {
    loadingBar.animate(1.0, {
      duration: 500,
      easing: 'easeIn'
    })
  }, 1000);

  setTimeout(() => {
    loadingBar.set(0);

    if (!textShown) {
      setTimeout(() => {
        util.removeClass(textElement, 'visible');
        setTimeout(() => util.addClass(textElement, 'hidden'), 800);
      }, 200);
    }
  }, 1700);
}

function checkOrSetFlag() {
  const textShown = localStorage.getItem('progressbar_text_shown');
  if (textShown !== 'true') {
    localStorage.setItem('progressbar_text_shown', 'true');
    return false;
  }

  return true;
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

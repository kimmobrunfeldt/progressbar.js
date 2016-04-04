require('./libs/modernizr.min.js');

const _ = {
  map: require('lodash.map'),
  forEach: require('lodash.foreach'),
  throttle: require('lodash.throttle')
};
const withinViewport = require('withinviewport');
const Visibility = require('visibilityjs');
const Slideout = require('slideout');
const attachFastClick = require('fastclick');
const ProgressBar = require('progressbar.js');
window.ProgressBar = ProgressBar;
console.log('> `ProgressBar` is available in console.')
console.log(ProgressBar);

const smoothScroll = require('./smooth-scroll');
const util = require('./util');
const introSquare = require('./examples/intro-square');
const introCircle = require('./examples/intro-circle');
const introTriangle = require('./examples/intro-triangle');
const initializeExamples = require('./init-examples');

attachFastClick(document.body);
Visibility.onVisible(main);

function main() {
  initUnsupportedPopup();

  // Create a fake loading bar, just for a demo. :)
  var loadingBar = createLoadingBar();
  playFakeLoadingDemo(loadingBar)

  const playIntro = initializeIntro();
  const examples = initializeExamples();

  setTimeout(() => {
    playIntro();

    setInterval(() => {
      _.forEach(examples.playLoops, (playLoop, idSelector) => {
        let parent = document.querySelector(idSelector).parentNode;
        if (parent instanceof SVGElement) {
          parent = parent.parentNode;
        }

        var isInViewport = withinViewport(parent);

        if (isInViewport) {
          playLoop.resume();
        } else {
          playLoop.pause();
        }
      });
    }, 400);
  }, 2000);

  const slideout = initSlideout();
  slideout.on('translatestart', () => examples.pause());
  slideout.on('translateend', () => examples.resume());

  initSmoothScroll();
}

function initSmoothScroll() {
  const contentContainer = document.querySelector('.content');

  const links = document.querySelectorAll('[data-scroll]');
  for (let i = 0; i < links.length; ++i) {
    let link = links[i];
    const selector = link.hash;
    link.addEventListener('click', event => {
      // Don't run if right-click or command/control + click
      if (event.button !== 0 || event.metaKey || event.ctrlKey) {
        return;
      }

      event.preventDefault();
      //window.location.hash = link.hash;
      smoothScroll(contentContainer, {
        to: selector
      });
    }, false);
  }
}

function initSlideout() {
  var slideout = new Slideout({
    menu: document.getElementById('side-menu'),
    panel: document.getElementById('content-wrapper'),
    padding: 256,
    tolerance: 100
  });

  const hamburgerButton = document.querySelector('.side-menu-toggle');
  const throttledToggle = _.throttle(slideout.toggle.bind(slideout), 600);
  hamburgerButton.addEventListener('click', throttledToggle);

  const topBar = document.querySelector('#top-bar');
  slideout.on('beforeopen', () => {
    util.addClass(hamburgerButton, 'is-active')
  });

  slideout.on('beforeclose', () => {
    util.removeClass(hamburgerButton, 'is-active')
  });

  var children = document.querySelector('#shape-links').children;
  for (var i = 0; i < children.length; ++i) {
    var liEl = children[i];
    liEl.addEventListener('click', () => slideout.close());
  }

  return slideout;
}

function initializeIntro() {
  const createBars = [introSquare, introCircle, introTriangle];
  const introBars = _.map(createBars, (createBar, i) => {
    return createBar('#intro-demo' + (i + 1));
  });

  return () => {
    setInterval(() => {
      _.forEach(introBars, bar => bar.set(0));
      playIntroDemo(introBars);
    }, 5000);

    playIntroDemo(introBars)
  };
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
  const textShown = util.getStorageSafe('progressbar_text_shown');
  if (textShown !== 'true') {
    util.setStorageSafe('progressbar_text_shown', 'true');
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

function initUnsupportedPopup() {
  if (!shouldShowUnsupported()) {
    dismissUnsupported();
  }

  const dismissButton = document.querySelector('#dismiss-not-supported');
  if (dismissButton) {
    dismissButton.addEventListener('click', () => {
      dismissUnsupported();
    });
  }
}

function shouldShowUnsupported() {
  return util.getStorageSafe('progressbar_dismiss_unsupported') !== 'true';
}

function dismissUnsupported() {
  const dismissForver = document.querySelector('#dismiss-not-supported-forever');
  if (dismissForver.checked) {
    util.setStorageSafe('progressbar_dismiss_unsupported', 'true');
  }

  const popup = document.querySelector('.not-supported-browser');
  popup.parentElement.removeChild(popup);
}

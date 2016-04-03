function playLoop(bar, start = true) {
  let interval;
  let playing = false;

  function animateBar() {
    bar.animate(1, () => {
      setTimeout(() => {
        bar.animate(0)
      }, 500);
    });
  }

  function resume() {
    if (playing) {
      return;
    }
    playing = true;
    interval = setInterval(() => {
      bar.set(0)
      animateBar();
    }, 4000);

    animateBar();
  }

  if (start) {
    resume();
  }

  return {
    pause: () => {
      if (interval) {
        bar.stop();
        clearInterval(interval);
      }

      playing = false;
    },
    resume: resume
  };
}

function removeClass(element, className) {
  var classes = element.className.split(' ');

  var newClasses = [];
  for (var i = 0; i < classes.length; ++i) {
    if (classes[i] !== className) {
      newClasses.push(classes[i]);
    }
  }

  element.className = newClasses.join(' ');
}

function addClass(element, className) {
  if (!hasClass(element, className)) {
    element.className += ' ' + className;
  }
}

function hasClass(element, className) {
  var classes = element.className.split(' ');
  for (var i = 0; i < classes.length; ++i) {
    if (classes[i].trim() === className) {
      return true;
    }
  }

  return false;
}

module.exports = {
  playLoop,
  removeClass,
  addClass,
  hasClass
};

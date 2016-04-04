const _ = {
  isString: require('lodash.isstring'),
  isFunction: require('lodash.isfunction'),
  merge: require('lodash.merge')
};
const Tweenable = require('shifty');

function smoothScroll(element, opts, cb) {
  opts = _.merge({
    duration: 500,
    easing: 'easeInOutCubic'
  }, opts);

  if (_.isString(opts.to)) {
    const el = document.querySelector(opts.to);
    if (!el) {
      throw new Error('No element found with selector: ' + opts.to);
    }

    opts.to = el.offsetTop;
  }

  const tweenable = new Tweenable();
  tweenable.tween({
    from: {scrollTop: element.scrollTop},
    to: {scrollTop: opts.to},
    duration: opts.duration,
    easing: opts.easing,
    step: function(state) {
      element.scrollTop = state.scrollTop;
    },
    finish: function(state) {
      if (_.isFunction(cb)) {
        cb();
      }
    }
  });
}

module.exports = smoothScroll;

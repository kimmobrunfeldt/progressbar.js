var Tweenable = require('shifty');
var tweenable = new Tweenable();

tweenable.tween({
  from: { a: 0 },
  to:   { a: 1 },
  duration: 500,
  easing: 'easeOutQuad',
  start: function () { console.log('Off I go!'); },
  step: function(state) {
    if (state.a === 1) {
        console.log('call stop')
      tweenable.stop();
      tweenable.dispose();
    }
  },
  finish: function () { console.log('And I\'m done!'); }
});

process.on('uncaughtException', err => {
    throw err;
})

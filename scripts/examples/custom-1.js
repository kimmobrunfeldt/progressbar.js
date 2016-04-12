// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/dnLLgm5o/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(pathId) {
  var bar = new ProgressBar.Path(pathId, {
    easing: 'easeInOut',
    duration: 1400
  });

  return bar;
}

module.exports = create;

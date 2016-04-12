const _ = require('lodash');
const {playLoop} = require('./util');
const examples = {
  line: [
    require('./examples/line-1'),
    require('./examples/line-2'),
    require('./examples/line-3')
  ],
  circle: [
    require('./examples/circle-1'),
    require('./examples/circle-2'),
    require('./examples/circle-3')
  ],

  semiCircle: [
    require('./examples/semi-circle-1'),
    require('./examples/semi-circle-2')
  ],
  custom: [
    require('./examples/custom-1')
  ]
};


function initialize() {
  let bars = {};

  _.forEach(examples, (createBars, key) => {
    return _.forEach(createBars, (createBar, i) => {
      const id = '#example-' + key.toLowerCase() + '-' + (i + 1);
      bars[id] = createBar(id);
    });
  });

  let playLoops = {};
  _.forEach(bars, (bar, id) => {
    playLoops[id] = playLoop(bar, false);
  });

  return {
    playLoops: playLoops,
    resume: function resume() {
      _.forEach(playLoops, loop => loop.resume());
    },
    pause: function pause() {
      _.forEach(playLoops, loop => loop.pause());
    }
  }
}

module.exports = initialize;

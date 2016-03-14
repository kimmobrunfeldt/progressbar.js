const _ = {
  map: require('lodash.map'),
  forEach: require('lodash.foreach'),
  flatten: require('lodash.flatten')
};
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
  ]
};

function initialize() {
  const bars = _.flatten(_.map(examples, (createBars, key) => {
    return _.map(createBars, (createBar, i) => {
      return createBar('#example-' + key + '-' + (i + 1));
    });
  }));

  _.forEach(bars, bar => playLoop(bar));
}

module.exports = initialize;
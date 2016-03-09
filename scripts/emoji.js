const _map = require('lodash.map');
const _range = require('lodash.range');
const punycode = require('punycode')

// See http://apps.timwhitlock.info/emoji/tables/unicode
const FIRST_EMOJI_UTF8_CODE = 0x1F601;
const LAST_EMOJI_UTF8_CODE = 0x1F64F;

const EMOJI_CODES =
  [0x1F609]  // wink
    .concat(_range(0x1F601, 0x1F607))
    .concat(_range(0x1F610, 0x1F636))
    .concat([0x1F60E]);  // sun glasses

const EMOJIS = _map(EMOJI_CODES, i => {
  return punycode.ucs2.encode([i]);
});

function getEmoji(progress) {
  const maxIndex = EMOJIS.length - 1;
  var index = Math.round(progress * maxIndex);
  return EMOJIS[index];
}

module.exports = {
  getEmoji
};

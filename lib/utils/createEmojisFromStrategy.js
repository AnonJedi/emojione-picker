"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEmojisFromStrategy;
function createEmojisFromStrategy(strategy) {
  var emojis = {};

  // categorise and nest emoji
  // sort ensures that modifiers appear unmodified keys
  var keys = Object.keys(strategy);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = strategy[key];

      // skip unknown categories
      if (value.category !== "modifier") {
        if (!emojis[value.category]) emojis[value.category] = {};
        var match = key.match(/(.*?)_tone(.*?)$/);

        if (match) {
          // this check is to stop the plugin from failing in the case that the
          // emoji strategy miscategorizes tones - which was the case here:
          // https://github.com/Ranks/emojione/pull/330
          var unmodifiedEmojiExists = !!emojis[value.category][match[1]];
          if (unmodifiedEmojiExists) {
            emojis[value.category][match[1]][match[2]] = value;
          }
        } else {
          emojis[value.category][key] = [value];
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return emojis;
}
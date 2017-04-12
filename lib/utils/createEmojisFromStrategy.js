"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEmojisFromStrategy;
//official unicode native emoji ranges from https://apps.timwhitlock.info/emoji/tables/unicode
var emojiRange = {
  emoticons: {
    begin: 0x1F601,
    end: 0x1F64F
  },
  dingbats: {
    begin: 0x2702,
    end: 0x27B0
  },
  transportAndMapSymbols: {
    begin: 0x1F680,
    end: 0x1F6C0
  },
  enclosedCharacters: {
    begin: 0x24C2,
    end: 0x1F251
  },
  additionalEmoticons: {
    begin: 0x1F600,
    end: 0x1F636
  },
  additionalTransportAndMapSymbols: {
    begin: 0x1F681,
    end: 0x1F6C5
  },
  otherAdditionalSymbols: {
    begin: 0x1F30D,
    end: 0x1F567
  }
};

function createEmojisFromStrategy(strategy) {
  var emojis = {};

  // categorise and nest emoji
  // sort ensures that modifiers appear unmodified keys
  var keys = Object.keys(strategy);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var key = _step.value;

      var value = strategy[key];

      //check has emoji native representation
      var skipEmoji = true;
      var emojiUnicode = Number.parseInt(value.unicode, 16);
      Object.keys(emojiRange).forEach(function (emojiCategory) {
        if (emojiRange[emojiCategory].begin <= emojiUnicode && emojiRange[emojiCategory].end >= emojiUnicode) skipEmoji = false;
      });
      if (skipEmoji) return "continue";

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
    };

    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ret = _loop();

      if (_ret === "continue") continue;
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
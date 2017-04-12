//official unicode native emoji ranges from https://apps.timwhitlock.info/emoji/tables/unicode
const emojiRange = {
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
  },
  // uncategorizedFirst: {},
  // uncategorizedSecond: {
  //   begin: 0x1F004,
  //   end: 0x1F5FF
  // }
};

export default function createEmojisFromStrategy(strategy) {
  const emojis = {};

  // categorise and nest emoji
  // sort ensures that modifiers appear unmodified keys
  const keys = Object.keys(strategy);
  for (const key of keys) {
    const value = strategy[key];

    //check has emoji native representation
    let skipEmoji = true;
    const emojiUnicode = Number.parseInt(value.unicode, 16);
    Object
      .keys(emojiRange)
      .forEach(emojiCategory => {
        if (emojiRange[emojiCategory].begin <= emojiUnicode && emojiRange[emojiCategory].end >= emojiUnicode)
          skipEmoji = false;
      });
    if (skipEmoji) continue;

    // skip unknown categories
    if (value.category !== "modifier") {
      if (!emojis[value.category]) emojis[value.category] = {};
      const match = key.match(/(.*?)_tone(.*?)$/);

      if (match) {
        // this check is to stop the plugin from failing in the case that the
        // emoji strategy miscategorizes tones - which was the case here:
        // https://github.com/Ranks/emojione/pull/330
        const unmodifiedEmojiExists = !!emojis[value.category][match[1]];
        if (unmodifiedEmojiExists) {
          emojis[value.category][match[1]][match[2]] = value;
        }
      } else {
        emojis[value.category][key] = [value];
      }
    }
  }

  return emojis;
}

const Transform = require('stream').Transform;
const config = require('./config');
let { action, shift } = config.setup();

const transform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(caesar(chunk.toString(), action, shift));
    callback();
  },
});

const lower = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const upper = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const findAndTransform = (char) => {
  // console.log('shift:', shift);

  if (lower.indexOf(char) > -1) {
    // console.log('shift now:', shift);
    let index = lower.indexOf(char) + shift;
    if (index > 25) {
      index = index - 26;
    }
    if (index < 0) {
      index = index + 26;
    }
    // console.log('index now:', index);
    return lower[index];
  }

  if (upper.indexOf(char) > -1) {
    // console.log('shift now:', shift);
    let index = upper.indexOf(char) + shift;
    if (index > 25) {
      index = index - 26;
    }
    if (index < 0) {
      index = index + 26;
    }
    // console.log('index now:', index);
    return upper[index];
  }

  return char;
};

const caesar = (string) => {
  let tmp = string.split('');

  let result = tmp.map((item) => {
    return findAndTransform(item);
  });

  let updated = result.join('');

  // console.log('result:', updated)

  return updated;
};

module.exports = transform;

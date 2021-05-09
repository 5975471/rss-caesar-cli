const { createReadStream, createWriteStream } = require('fs');

const config = require('./config');
const transform = require('./transform');

const {
  action,
  shift,
  inputMode,
  outputMode,
  inputFileName,
  outputFileName,
} = config.setup();

let readStream = null;
let writeStream = null;

console.log('>> working >>');

// file->file
if (inputMode === 'file' && outputMode === 'file') {
  readStream = createReadStream(inputFileName, 'UTF-8');
  writeStream = createWriteStream(outputFileName, { flags: 'a' });

  readStream.pipe(transform).pipe(writeStream).on('error', console.error);

  writeStream.on('close', () => {
    process.stdout.write('--- done ---\n');
  });
}

// in -> file
if (inputMode === 'stdin' && outputMode === 'file') {
  console.log('enter text to encode, ctrl+c to exit:');
  // console.log('shift:', shift);
  readStream = process.stdin.on('data', (chunk) => {
    let text = chunk.toString().trim();
    // console.log('passed >', text);
  });
  writeStream = createWriteStream(outputFileName, { flags: 'a' });

  readStream.pipe(transform).pipe(writeStream).on('error', console.error);
}

// file -> out
if (inputMode === 'file' && outputMode === 'stdout') {
  readStream = createReadStream(inputFileName);
  // writeStream = process.stdout;
  readStream.pipe(transform).pipe(process.stdout);
}

// in -> out
if (inputMode === 'stdin' && outputMode === 'stdout') {
  console.log('enter text to encode, ctrl+c to exit:');
  process.stdin.pipe(transform).pipe(process.stdout);
}

module.exports = readStream;

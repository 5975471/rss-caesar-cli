const fs = require('fs');

const isAction =
  process.argv.includes('-a') || process.argv.includes('--action');
const isShift = process.argv.includes('-s') || process.argv.includes('--shift');
const isInputFile =
  process.argv.includes('-i') || process.argv.includes('--input');
const isOutputFile =
  process.argv.includes('-o') || process.argv.includes('--output');

// const {name, version} = require('./package.json');
let action = '';
let shift = 0;
let inputFileName = '';
let outputFileName = '';
let inputMode = '';
let outputMode = '';

const HELP_MESSAGE = `
-s, --shift   set shift
-i, --input   set input file
-o, --output  set output file
-a, --action  set action (encode|decode)`;

if (process.argv.length < 3) {
  console.log(HELP_MESSAGE);
  process.exit(1);
}

const fileExist = (file) => {
  let fileName = String(file);
  // fs.accessSync(fileName, (err) => {
  //   if (err) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  if (fs.existsSync(fileName)) {
    return true;
  } else {
    return false;
  }
};

exports.setup = () => {
  /** helper */
  const isValidParam = (v) => {
    let i = process.argv.indexOf(v);
    if (i != -1) {
      return process.argv[i + 1];
    } else {
      return false;
    }
  };

  if (isInputFile) {
    // check file exist
    let file = isValidParam('-i');
    if (!file) {
      file = isValidParam('--input');
    }

    if (fileExist(file)) {
      inputFileName = file;
      inputMode = 'file';
    } else {
      console.log(`error: input file doesn\'t exist. exiting`);
      process.exit(1);
    }
  } else {
    inputMode = 'stdin';
  }

  if (isOutputFile) {
    // check file exist
    let file = isValidParam('-o');
    if (!file) {
      file = isValidParam('--output');
    }

    if (fileExist(file)) {
      outputFileName = file;
      outputMode = 'file';
    } else {
      console.log(`error: output file doesn\'t exist. exiting`);
      process.exit(1);
    }
  } else {
    outputMode = 'stdout';
  }

  const checkAction = (val) => {
    if (val === 'encode' || val === 'decode') {
      return val;
    } else {
      console.log('error : action name is wrong. exiting');
      console.log(HELP_MESSAGE);
      process.exit(1);
    }
  };

  if (isAction) {
    // calculate
    let i = process.argv.indexOf('-a');
    if (i != -1) {
      action = checkAction(process.argv[i + 1]);
    } else {
      action = checkAction(process.argv[process.argv.indexOf('--action') + 1]);
    }
  } else {
    console.error('error: need to set action parameter. exiting');
    console.log(HELP_MESSAGE);
    process.exit(1);
  }

  if (isShift) {
    // calculate shift
    let i = process.argv.indexOf('-s');
    shift = parseInt(process.argv[i + 1]);
    // !! need to check shift value
    if (!shift) {
      shift = 0;
    }
  } else {
    console.error('error: need to set shift parameter. exiting');
    console.log(HELP_MESSAGE);
    process.exit(1);
  }

  return {
    action,
    shift,
    inputMode,
    outputMode,
    inputFileName,
    outputFileName,
  };
};

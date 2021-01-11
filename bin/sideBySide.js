const { getParams } = require('./helpers/cli');
const { readLineByLine, formatFiles } = require('./helpers/file');

/**
 * Execute the outsie call. Can be catch two params from argv
 * -s that is a number and defines the width of text line
 * -c that is a number and defines length of space betwhen file lines
 *
 *
 */
const cli = async () => {
  try {
    const { files, flags } = getParams();

    const formatedFiles = await formatFiles(files, flags.columnWidth);

    console.log(readLineByLine(formatedFiles, flags));
  } catch (e) {
    console.error(e);
  }
};

cli();

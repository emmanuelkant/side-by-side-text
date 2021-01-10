const { getParams } = require('./helpers/cli');
const { slipLines, readLineByLine, formatFiles } = require('./helpers/file');

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

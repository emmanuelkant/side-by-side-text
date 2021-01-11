const fs = require('fs');

/**
 * Format the files to facilitate the render
 *
 * @param {array} files array of file which an of them has an array of lines
 * @param {number} columnWidth number of width of text line passed by cli
 * @return {array} Formatted array of files
 */
const formatFiles = async (files, columnWidth) => {
  const preFormatedFiles = await Promise.all(files.map(slipLines));
  return justify(preFormatedFiles, columnWidth);
};

/**
 * Separate the lines by line break.
 *
 * @param {string} file path of document
 * @return {Object} a object that has two
 * attributes. The first is an array which has the all lines broken
 * by break lines's file. And the second is a number
 */
const slipLines = async file => {
  const stringFile = fs.readFileSync(file, { encoding: 'utf-8' });
  const allLines = stringFile.split('\n');

  return allLines.reduce(
    (acc, cur) => {
      acc.fileLines.push(cur);
      acc.largerLine = acc.largerLine > cur.length ? acc.largerLine : cur.length;
      return acc;
    },
    { fileLines: [], largerLine: 0 }
  );
};

/**
 * Kind of justification of text lines. If has columnWidth, breaks the lines in more
 * lines.
 *
 * @param {array} files list of all files passed by cli
 * @param {number} columnWidth number of width of text line passed by cli
 * @return {array} An array with all lines correctly positioned.
 */
const justify = (files, columnWidth) => {
  if (columnWidth) {
    return files.map(file => {
      const { fileLines } = file;

      const splittedLines = fileLines.reduce((acc, cur) => {
        const lines = [];

        if (cur.length === 0) {
          return [...acc, ' '.repeat(columnWidth)];
        }

        for (let i = 0; i < Math.ceil(cur.length / columnWidth); i++) {
          const start = columnWidth * i;
          const end = start + columnWidth;
          lines.push(cur.substring(start, end));
        }

        return [...acc, ...lines];
      }, []);
      return applyColumnWidth(splittedLines, columnWidth);
    });
  }

  return files.map(file => {
    const { fileLines, largerLine } = file;
    return applyColumnWidth(fileLines, largerLine);
  });
};

/**
 * Fill up the blank spaces with spaces indeed until passed param.
 *
 * @param {array} fileLines list lines splitted by break lines
 * @param {number} columnWidth number of width of text line passed by cli
 * @return {array} An array with all lines filled up by spaces, indeed.
 */
const applyColumnWidth = (fileLines, columnWidth) => fileLines.map(line => line.padEnd(columnWidth, ' '));

/**
 * Create an array that save all lines of all files side by side, line by line.
 *
 * @param {array} files list lines splitted by break lines and with spaces filled
 * up with spaces, indeed.
 * @param {object} flags object with all flags passed by cli, with your
 * respectively values.
 * @return {array} An array ready to render with lines lined up.
 */
const readLineByLine = (files, flags) => {
  const diffLines = [];
  const { spaceChar } = flags;
  const maxLines = getMaxLines(files);

  for (let i = 0; i < maxLines; i++) {
    diffLines.push(
      files
        .map(fileLines => {
          const columnWidth = getColumnWidth(fileLines);
          return fileLines[i] || ' '.repeat(columnWidth);
        })
        .join(' '.repeat(spaceChar))
    );
  }

  return diffLines.join('\n');
};

/**
 * Search in a array of strings for who is the biggest.
 *
 * @param {array} files list lines splitted by break lines and with spaces filled
 * up with spaces, indeed.
 * @return {number} a number of the biggest string from the array.
 */
const getMaxLines = files => {
  let maxLines = 0;

  files.forEach(fileLines => (maxLines = fileLines.length > maxLines ? fileLines.length : maxLines));

  return maxLines;
};

/**
 * Get the length of the first string element of an array.
 *
 * @param {array} file list lines splitted by break lines and with spaces filled
 * up with spaces, indeed.
 * @return {number} a number of width of the first string element from an array.
 */
const getColumnWidth = file => file[0] && file[0].length;

module.exports = { slipLines, readLineByLine, formatFiles };

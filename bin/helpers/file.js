const fs = require('fs');
const readline = require('readline');

const formatFiles = async (files, columnWidth) => {
  const preFormatedFiles = await Promise.all(files.map(slipLines));
  return justify(preFormatedFiles, columnWidth);
};

const slipLines = async file => {
  let largerLine = 0;
  const fileLines = [];
  const fileStream = fs.createReadStream(file);

  const linesStream = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of linesStream) {
    fileLines.push(line);
    largerLine = largerLine > line.length ? largerLine : line.length;
  }

  return { fileLines, largerLine };
};

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
          const end = start + columnWidth + 1;
          lines.push(cur.substring(start, end));
        }

        return [...acc, ...lines];
      }, []);
      return applyColumnWidth(splittedLines, columnWidth + 1);
    });
  }

  return files.map(file => {
    const { fileLines, largerLine } = file;
    return applyColumnWidth(fileLines, largerLine);
  });
};

const applyColumnWidth = (fileLines, columnWidth) => fileLines.map(line => line.padEnd(columnWidth, ' '));

const getMaxLines = files => {
  let maxLines = 0;

  files.forEach(fileLines => (maxLines = fileLines.length > maxLines ? fileLines.length : maxLines));

  return maxLines;
};

const getColumnWidth = files => files[0][0].length;

const readLineByLine = (files, flags) => {
  const diffLines = [];
  const { spaceChar } = flags;
  const maxLines = getMaxLines(files);
  const columnWidth = getColumnWidth(files);

  for (let i = 0; i < maxLines; i++) {
    diffLines.push(files.map(fileLines => fileLines[i] || ' '.repeat(columnWidth)).join(' '.repeat(spaceChar)));
  }

  return diffLines.join('\n');
};

module.exports = { slipLines, readLineByLine, formatFiles };

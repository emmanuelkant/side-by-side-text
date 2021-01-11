/**
 * Valid the flag passed. First verifies if is a non-number,
 * then verifies if the flag -c is greater than 0. If any
 * of these verifications was true, than throws an Error
 *
 * @param {string} flag name of the flag
 * @param {string} flagValue value of the flag
 * @throws Will throws an error if flagValue is a non-number,
 * or has no flagValue or if the flag -c is greater than 0.
 */
const isValidFlag = (flag, flagValue) => {
  if (flagValue && isNaN(flagValue)) {
    throw new Error('Has can be empty and has to be a number');
  }

  if (flag === 'spaceChar' && parseInt(flagValue) < 0) {
    throw new Error('The -c flag has to be greater than or equal 0');
  }

  return true;
};

/**
 * Get the argv from cli, process them, valid them, and returns
 * just a onject with two attibutes. First of them is `files`
 * that save all files strings that was passed by cli. And
 * the `flags`, that is the flags and your values.
 *
 */
const getParams = () => {
  const params = process.argv.slice(2).reduce(
    (acc, cur) => {
      if (cur === '-s') {
        return { ...acc, cacheFlag: { name: 'columnWidth' } };
      }

      if (cur === '-c') {
        return { ...acc, cacheFlag: { name: 'spaceChar' } };
      }

      if (acc.cacheFlag.name) {
        return (
          isValidFlag(acc.cacheFlag.name, cur) && {
            ...acc,
            cacheFlag: { name: '' },
            flags: {
              ...acc.flags,
              [acc.cacheFlag.name]: parseInt(cur),
            },
          }
        );
      }

      return { ...acc, files: [...acc.files, cur] };
    },
    { cacheFlag: { name: '' }, flags: { spaceChar: 2, columnWidth: 0 }, files: [] }
  );

  return { files: params.files, flags: params.flags };
};

module.exports = { getParams };

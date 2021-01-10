const isValidFlag = (flag, flagValue) => {
  if (flagValue && isNaN(flagValue)) {
    throw new Error('Has can be empty and has to be a number');
  }

  if (flag === 'spaceChar' && parseInt(flagValue) < 0) {
    throw new Error('The -c flag has to be greater than or equal 0');
  }

  return true;
};

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


export const update = (obj, args, { cache }) => {

  const SearchField = {
    __typename: 'SearchField',
    isVisible: args.isVisible
  };
  cache.writeData({ data: { SearchField } });
  return { SearchField, ...SearchField };
};

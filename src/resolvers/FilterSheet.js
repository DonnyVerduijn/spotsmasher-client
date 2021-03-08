
export const show = (obj, args, { cache }) => {
  const FilterSheet = {
    __typename: 'FilterSheet',
    isOpen: true
  };

  cache.writeData({ data: { FilterSheet } });
  return { FilterSheet, ...FilterSheet };
};

export const hide = (obj, args, { cache }) => {
  const FilterSheet = {
    __typename: 'FilterSheet',
    isOpen: false
  };

  cache.writeData({ data: { FilterSheet } });
  return { FilterSheet, ...FilterSheet };
};
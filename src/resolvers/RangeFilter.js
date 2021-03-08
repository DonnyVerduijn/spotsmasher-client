import gql from 'graphql-tag';

export const update = (obj, { value }, { cache }) => {
  const query = gql`
    query RangeFilter {
      RangeFilter @client {
        value
      }
    }
  `;

  const data = cache.readQuery({ query });
  const RangeFilter = Object.assign({}, data.RangeFilter, {
    value
  });

  cache.writeData({ data: { RangeFilter } });
  return { RangeFilter, ...RangeFilter };
};
import gql from 'graphql-tag';

export const set = (obj, args, { cache }) => {
  const data = cache.readQuery({
    query: gql`
      query OrderingFilter{
        OrderingFilter @client {
          column
          direction
        }
      }
    `
  });
  const OrderingFilter = Object.assign(
    {},
    data.OrderingFilter,
    args.input
  );

  cache.writeData({ data: { OrderingFilter } });
  return { OrderingFilter, ...OrderingFilter };
};

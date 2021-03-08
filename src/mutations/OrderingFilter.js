import gql from 'graphql-tag';

export const set = gql`
  mutation setOrderingFilter($input: OrderingFilterInput) {
    setOrderingFilter(input: $input) @client {
      column
      direction
    }
  }
`;

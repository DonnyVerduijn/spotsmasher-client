import gql from 'graphql-tag';

export const update = gql`
  mutation updateRangeFilter($value: Int) {
    updateRangeFilter(value: $value) @client {
      value
    }
  }
`;
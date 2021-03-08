import gql from 'graphql-tag';

export default gql`
  query getRangeFilter {
    RangeFilter @client {
      value
    }
  }
`;
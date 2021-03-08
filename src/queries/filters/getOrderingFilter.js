import gql from 'graphql-tag';

export default gql`
  query getOrderingFilter {
    OrderingFilter @client {
      column
      direction
    }
  }
`;

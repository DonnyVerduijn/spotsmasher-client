import gql from 'graphql-tag';

export default gql`
  query getFilterSheet {
    FilterSheet @client {
      isOpen
    }
  }
`;

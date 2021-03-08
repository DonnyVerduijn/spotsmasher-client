import gql from 'graphql-tag';

export default gql`
  query getSearchField {
    SearchField @client {
      isVisible
    }
  }
`;

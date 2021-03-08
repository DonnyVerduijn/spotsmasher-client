import gql from 'graphql-tag';

export const update = gql`
  mutation updateSearchField($isVisible: Boolean) {
    updateSearchField(isVisible: $isVisible) @client {
      isVisible
    }
  }
`;
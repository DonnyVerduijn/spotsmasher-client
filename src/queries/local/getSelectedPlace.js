import gql from 'graphql-tag';

export default gql`
  query getSelectedPlace {
    SelectedPlace @client {
      geometry {
        location {
          lat
          lng
        }
      }
      name
    }
  }
`;
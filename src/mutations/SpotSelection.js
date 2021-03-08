import gql from 'graphql-tag';

export const add = gql`
  mutation addSpotToSelection($id: ID) {
    addSpotToSelection(id: $id) @client {
      SpotSelection {
          selected {
              id
          }
      }
    }
  }
`;
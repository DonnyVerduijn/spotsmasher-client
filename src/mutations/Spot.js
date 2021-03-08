import gql from 'graphql-tag';

export const unlock = gql`
  mutation unlockSpot($id: ID!) {
    unlockSpot(id: $id) {
      ... on LockedSpot {
        id
      }
      ... on UnlockedSpot {
        id
      }
    }
  }
`;

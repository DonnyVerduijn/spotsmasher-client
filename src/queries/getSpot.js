import gql from 'graphql-tag';

export default gql`
  query getSpot($id: ID) {
    Spot(id: $id) {
      ... on LockedSpot {
        id
        # location {
        #   coordinates
        # }
        media {
          id
          url
        }
      }
      ... on UnlockedSpot {
        id
        title
        description
        location {
          coordinates
        }
        media {
          id
          url
        }
      }
    }
  }
`;

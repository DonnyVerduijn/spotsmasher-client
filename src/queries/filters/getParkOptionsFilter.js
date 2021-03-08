import gql from 'graphql-tag';

export default gql`
  query getParkOptionsFilter {
    ParkOptionsFilter {
      id
      name
      attributes {
        id
        name
        value
      }
    }
  }
`;
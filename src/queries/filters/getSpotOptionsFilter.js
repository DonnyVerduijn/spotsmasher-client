import gql from 'graphql-tag';

export default gql`
  query getSpotOptionsFilter {
    SpotOptionsFilter {
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
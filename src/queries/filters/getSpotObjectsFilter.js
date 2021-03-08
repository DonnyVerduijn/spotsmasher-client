import gql from 'graphql-tag';

export default gql`
  query getSpotObjectsFilter {
    SpotObjectsFilter {
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

import gql from 'graphql-tag';

export default gql`
  query getParkDisciplineFilter {
    ParkDisciplinesFilter {
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
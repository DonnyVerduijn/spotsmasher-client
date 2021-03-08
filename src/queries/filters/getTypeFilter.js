import gql from 'graphql-tag';

export default gql`
  query getTypeFilter {
    TypeFilter {
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
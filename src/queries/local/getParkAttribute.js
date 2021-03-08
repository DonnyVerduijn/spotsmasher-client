import gql from 'graphql-tag';

export default gql`
  query getParkAttribute {
    Attribute(id: 3) @client {
      id
      name
      value
    }
  }
`;

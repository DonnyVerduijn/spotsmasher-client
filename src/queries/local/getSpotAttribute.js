import gql from 'graphql-tag';

export default gql`
  query getAttribute {
    Attribute(id: 4) @client {
      id
      name
      value
    }
  }
`;
import gql from 'graphql-tag';

export const update = gql`
  mutation updateAttributeValue($id: ID, $value: Boolean) {
    updateAttributeValue(id: $id, value: $value) @client {
      id
      name
      value
    }
  }
`;
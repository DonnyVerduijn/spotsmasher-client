import gql from 'graphql-tag';

export default gql`
  query place($input: PlaceInput!) {
    place(input: $input) {
      
      id
      place_id
      name
      formatted_address
      geometry {
        location {
          lat
          lng
        }
      }
    }
  }
`;

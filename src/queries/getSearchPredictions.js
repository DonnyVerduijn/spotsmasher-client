import gql from 'graphql-tag';

export default gql`
  query getSearchPredictions($input: PlacesAutoCompleteInput!) {
    placesAutoComplete(input: $input) {
      id
      place_id
      description
    }
  }
`;

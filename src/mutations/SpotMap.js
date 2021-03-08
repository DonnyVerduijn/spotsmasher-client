import gql from 'graphql-tag';

export const update = gql`
  mutation updateSpotMap($zoom: Int, $center: LatLng, $bounds: LatLngBounds) {
    updateSpotMap(zoom: $zoom, center: $center, bounds: $bounds) @client
  }
`;

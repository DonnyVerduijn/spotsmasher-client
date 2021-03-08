export const defaults = {
  SelectedPlace: {
    __typename: 'Place',
    name: 'Den Haag',
    place_id: '',
    formatted_address: '',
    geometry: {
      __typename: 'Geometry',
      location: {
        __typename: 'LatLng',
        lat: 52.078663,
        lng: 4.288788
      }
    }
  },
  SpotMap: {
    __typename: 'SpotMap',
    zoom: 12,
    center: { lat: 51, lng: 4, __typename: 'LatLng' }
  },
  MainMenu: { __typename: 'MainMenu', isOpen: false },
  FilterSheet: { __typename: 'FilterSheet', isOpen: false },
  RangeFilter: { __typename: 'RangeFilter', value: 10 },
  OrderingFilter: {
    __typename: 'OrderingFilter',
    column: 'DISTANCE',
    direction: 'ASC'
  },
  SearchField: { __typename: 'SearchField', isVisible: false }
};

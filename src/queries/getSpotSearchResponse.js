import { compose } from 'recompose';
import gql from 'graphql-tag';
import getTypeFilter from './filters/getTypeFilter';
import getSpotObjectsFilter from './filters/getSpotObjectsFilter';
import getSpotOptionsFilter from './filters/getSpotOptionsFilter';
import getParkDisciplinesFilter from './filters/getParkDisciplinesFilter';
import getParkOptionsFilter from './filters/getParkOptionsFilter';
import getRangeFilter from './filters/getRangeFilter';
import getOrderingFilter from './filters/getOrderingFilter';
import getSelectedPlace from './local/getSelectedPlace';
import omit from 'lodash.omit';
import { useQuery } from '@apollo/react-hooks';

const toLatLng = geoJson => {
  return geoJson
    ? {
      latitude: geoJson.location.lat,
      longitude: geoJson.location.lng
    }
    : null;
};

const multiplyBy = amount => value => value * amount;

const {
  filterByObjectProperty,
  mapToObjectProperty,
  getObjectProperty,
  storeInObjectProperty,
  omitObjectProperty,
  transformObjectProperty,
  renameObjectProperty
} = {
  filterByObjectProperty(key, value) {
    return array => array.filter(item => item[key] === value);
  },
  mapToObjectProperty(key) {
    return array => array.map(item => item[key]);
  },
  getObjectProperty(key, defaultValue = undefined) {
    return object => (object[key] ? object[key] : defaultValue);
  },
  storeInObjectProperty(key) {
    return value => ({ [key]: value });
  },
  omitObjectProperty(key) {
    return object => omit(object, key);
  },
  transformObjectProperty(key, transformer) {
    return object =>
      Object.assign({}, object, { [key]: transformer(object[key]) });
  },
  renameObjectProperty(key, newKey) {
    return object =>
      omit(Object.assign({}, object, { [newKey]: object[key] }), key);
  }
};

const defaultMapper = (...operations) => (data = {}) =>
  compose(
    omitObjectProperty('__typename'),
    ...operations
  )(data);

const mapAttributeFilterInput = defaultMapper(
  storeInObjectProperty('selected'),
  mapToObjectProperty('id'),
  filterByObjectProperty('value', true),
  getObjectProperty('attributes', [])
);
const mapRangeFilterInput = defaultMapper(
  storeInObjectProperty('value'),
  multiplyBy(1000),
  getObjectProperty('value', 0)
);
const mapOrderingFilterInput = defaultMapper();
const mapSelectedPlaceInput = defaultMapper(
  renameObjectProperty('geometry', 'location'),
  transformObjectProperty('geometry', toLatLng)
);

const getSpotSearchResponse = gql`
  query getSpotSearchResponse($input: SpotSearchInput!) {
    SpotSearchResponse(input: $input) {
      id
      results {
        ... on LockedSpot {
          id
          media {
            id
            url
          }
        }
        ... on UnlockedSpot {
          id
          title
          description
          distance
          location {
            coordinates
          }
          media {
            id
            url
          }
        }
      }
      total
    }
  }
`;

export default function useSpotSearchResponse() {
  const filterQueries = [
    useQuery(getTypeFilter),
    useQuery(getSpotObjectsFilter),
    useQuery(getSpotOptionsFilter),
    useQuery(getParkDisciplinesFilter),
    useQuery(getParkOptionsFilter),
    useQuery(getRangeFilter),
    useQuery(getOrderingFilter),
    useQuery(getSelectedPlace)
  ];

  const filters = filterQueries.reduce((acc, query) => {
    return { ...acc, ...query.data };
  }, {});

  // const loading = filterQueries.some(filter => filter.loading)

  // 

  return useQuery(getSpotSearchResponse, {
    returnPartialData: true,
    variables: {
      input: {
        filters: {
          TypeFilter: mapAttributeFilterInput(filters.TypeFilter),
          SpotObjectsFilter: mapAttributeFilterInput(filters.SpotObjectsFilter),
          SpotOptionsFilter: mapAttributeFilterInput(filters.SpotOptionsFilter),
          ParkDisciplinesFilter: mapAttributeFilterInput(
            filters.ParkDisciplinesFilter
          ),
          ParkOptionsFilter: mapAttributeFilterInput(filters.ParkOptionsFilter),
          RangeFilter: mapRangeFilterInput(filters.RangeFilter),
          OrderingFilter: mapOrderingFilterInput(filters.OrderingFilter),
          SelectedPlace: mapSelectedPlaceInput(filters.SelectedPlace),
          // limit: 50,
          offset: 0
        }
      }
    }
  });
}

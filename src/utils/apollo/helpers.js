import { graphql } from 'react-apollo';
import omit from 'lodash.omit';
import { useQuery as nativeUseQuery } from '@apollo/react-hooks';

export const withQuery = (query, userConfig) => {
  // name of the first graphql selectionSet
  const selections = query.definitions[0].selectionSet.selections.map(
    selection => selection.name.value
  );
  const defaultConfig = {
    props: ({ data }) =>
      selections.reduce(
        (acc, key) => ({
          ...acc,
          [key]: data[key] ? omit(data[key], '__typename') : {}
        }),
        {}
      )
  };
  const configOverrides =
    typeof userConfig === 'function' ? userConfig(...selections) : {};

  const config = Object.assign({}, defaultConfig, configOverrides);
  return graphql(query, config);
};

export const withMutation = (mutation, userConfig) => {
  const key = Object.keys(mutation)[0];
  const config = userConfig ? userConfig : { name: key };
  return graphql(mutation[key], config);
};

export const useQuery = (query, options) => {
  const selections = query.definitions[0].selectionSet.selections.map(
    selection => selection.name.value
  );

  const { data, loading } = nativeUseQuery(query, options);
  return loading ? null : !data ? null : data[selections[0]];
};

export const useLocalQuery = (query, options) => {
  const selections = query.definitions[0].selectionSet.selections.map(
    selection => selection.name.value
  );

  const { data } = nativeUseQuery(query, options);
  return data ? data[selections[0]] : null;
};

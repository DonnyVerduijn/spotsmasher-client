import React from 'react';
import { withApollo } from 'react-apollo';
import { SearchField } from './SearchField';
import getPlace from './../../queries/getPlace';
import getSearchPredictions from './../../queries/getSearchPredictions';
import { withRouter } from 'react-router-dom';

export const SearchFieldContainer = withApollo(
  withRouter(({ history, client }) => {
    return (
      <SearchField
        fetchPredictions={async input => {
          const { data } = await client.query({
            query: getSearchPredictions,
            variables: { input }
          });

          return data.placesAutoComplete;
        }}
        updateSelectedPlace={async place_id => {
          const { data } = await client.query({
            query: getPlace,
            variables: { input: { placeid: place_id } }
          });

          client.writeData({
            data: { SelectedPlace: data.place }
          });

          history.push('/');

          return data.place;
        }}
      />
    );
  })
);

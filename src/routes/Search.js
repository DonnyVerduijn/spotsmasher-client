import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import { Paper, Fab } from '@material-ui/core';
import classNames from 'classnames';
import useSpotSearchResponse from '../queries/getSpotSearchResponse';
import InfoBar from '../modules/InfoBar/InfoBar';
import SpotGrid from '../modules/SpotGrid/SpotGrid';
import FilterSheetComponent from '../modules/FilterSheet/FilterSheet';
import getFilterSheet from '../queries/local/getFilterSheet';
import InfoBarText from '../modules/InfoBar/InfoBarText';
import FilterButton from '../modules/InfoBar/FilterButton';
import { show as showFilterSheet } from '../mutations/FilterSheet';
import { AddLocation } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  search: {
    zIndex: 0,
    [theme.breakpoints.down('sx')]: {
      width: '100%'
    }
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const createText = ({ total, name }) =>
  total !== 0
    ? `${total} spot${total > 1 ? 's' : ''} in de buurt van ${name}`
    : `No results for ${name}`;

const Search = () => {
  const classes = useStyles();
  const { loading: spotsLoading, data, variables } = useSpotSearchResponse();
  const FilterSheet = useQuery(getFilterSheet);
  const [show] = useMutation(showFilterSheet, {
    ignoreResults: true
  });

  const total =
    !spotsLoading && data.SpotSearchResponse
      ? data.SpotSearchResponse.total
      : 0;

  const name = variables.input.filters.SelectedPlace.name;

  return (
    <>
      <Paper
        square
        elevation={0}
        classes={{
          root: classNames(classes.search)
        }}
      >
        <InfoBar className={classNames(classes.infoBar)}>
          <InfoBarText>
            {!spotsLoading ? createText({ total, name }) : 'Loading...'}
          </InfoBarText>
          <FilterButton
            onClick={show}
            visible={FilterSheet && !FilterSheet.isOpen}
          />
        </InfoBar>
        <SpotGrid
          spots={
            !spotsLoading && data.SpotSearchResponse
              ? data.SpotSearchResponse.results
              : []
          }
        />
      </Paper>
      <Fab
        size="large"
        color="secondary"
        aria-label="add"
        className={classes.margin}
      >
        <AddLocation />
      </Fab>
      <FilterSheetComponent />
    </>
  );
};

export default memo(Search);

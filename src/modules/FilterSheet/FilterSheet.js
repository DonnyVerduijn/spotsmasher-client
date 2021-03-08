import React, { memo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Drawer, Divider } from '@material-ui/core';
import { useLocalQuery } from './../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import getFilterSheet from '../../queries/local/getFilterSheet';
import { hide as hideFilterSheet } from './../../mutations/FilterSheet';
import FilterSheetHeader from './FilterSheetHeader';
import RangeFilter from './filters/RangeFilter';
import TypeFilter from './filters/TypeFilter';
import SpotFilter from './filters/SpotFilter';
import ParkFilter from './filters/ParkFilter';
import getParkAttribute from '../../queries/local/getParkAttribute';
import getSpotAttribute from '../../queries/local/getSpotAttribute';

const useDrawerStyles = makeStyles(theme => ({
  paper: {
    zIndex: 0,
    [theme.breakpoints.down('xs')]: {
      width: '20em'
    },
    [theme.breakpoints.up('xs')]: {
      width: theme.filterSheet.small
    },
    [theme.breakpoints.up('xl')]: {
      width: theme.filterSheet.big
    }
  }
}));

const useToolbarStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

const FilterSheet = () => {
  const FilterSheet = useLocalQuery(getFilterSheet);
  const { toolbar } = useToolbarStyles();
  const [hide] = useMutation(hideFilterSheet, { ignoreResults: true });
  const SpotAttribute = useLocalQuery(getSpotAttribute);
  const ParkAttribute = useLocalQuery(getParkAttribute);
  const theme = useTheme();
  const isTemporary = useMediaQuery(
    `(max-width: ${theme.breakpoints.values.sm}px)`
  );
  const drawer = useDrawerStyles();

  return (
    <Drawer
      variant={isTemporary ? 'temporary' : 'persistent'}
      PaperProps={{ square: true, elevation: 0 }}
      anchor="right"
      open={FilterSheet.isOpen}
      onClose={hide}
      transitionDuration={0}
      classes={drawer}
    >
      {!isTemporary && <div className={toolbar} />}
      {!isTemporary && <Divider />}
      <FilterSheetHeader />
      {/* <OrderingFilter /> */}
      <RangeFilter />
      <TypeFilter />
      {SpotAttribute && SpotAttribute.value && <SpotFilter />}
      {ParkAttribute && ParkAttribute.value && <ParkFilter />}
    </Drawer>
  );
};

export default memo(FilterSheet);

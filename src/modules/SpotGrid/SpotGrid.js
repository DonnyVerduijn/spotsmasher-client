import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useLocalQuery } from './../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SpotGridItem from './SpotGridItem';
import Paper from '@material-ui/core/Paper';
import { unlock as unlockSpot } from './../../mutations/Spot';
import { add as addSpotToSelection } from './../../mutations/SpotSelection';
import getFilterSheet from '../../queries/local/getFilterSheet';
import classNames from 'classnames';
const useStyles = makeStyles(theme => ({
  SpotGrid: {
    display: 'grid',
    margin: 0,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    },
    gridGap: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(20em, 1fr)) !important'
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(18em, 1fr)) !important'
    }
  },
  root: {
    flexGrow: 1
  }
}));

const SpotGrid = ({ spots }) => {
  const classes = useStyles();
  const [unlockSpotHandler] = useMutation(unlockSpot, { ignoreResults: true });
  const [addSpotToSelectionHandler] = useMutation(addSpotToSelection, {
    ignoreResults: true
  });
  const FilterSheet = useLocalQuery(getFilterSheet);
  const history = useHistory();
  const navigateSpotHandler = id => {
    history.push(`/spot/${id}`);
  };

  return (
    <Paper square elevation={0}>
      <ul
        className={classNames(classes.SpotGrid, {
          [classes.small]: FilterSheet.isOpen,
          [classes.big]: !FilterSheet.isOpen
        })}
      >
        {spots.map((spot, index) => (
          <SpotGridItem
            key={index}
            spot={spot}
            unlockSpotHandler={() => unlockSpotHandler(spot.id)}
            addSpotToSelectionHandler={() => addSpotToSelectionHandler(spot.id)}
            navigateSpotHandler={() => {
              navigateSpotHandler(spot.id);
            }}
          />
        ))}
      </ul>
    </Paper>
  );
};

SpotGrid.propTypes = {
  history: PropTypes.object,
  spots: PropTypes.array
};

SpotGrid.defaultProps = {
  SpotSearchResponse: {
    results: []
  }
};

export default memo(SpotGrid);

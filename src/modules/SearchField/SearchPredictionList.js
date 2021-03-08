import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { SearchPrediction } from './SearchPrediction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  SearchPredictionList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    position: 'absolute',
    display: 'none',
    // zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  isOpen: {
    display: 'block'
  }
}));

export const SearchPredictionList = ({
  predictions,
  onPredictionClicked,
  isOpen,
  selectedIndex
}) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={16}
      className={classNames(classes.SearchPredictionList, {
        [classes.isOpen]: isOpen
      })}
    >
      {predictions.map((prediction, index) => (
        <SearchPrediction
          key={prediction.place_id}
          prediction={prediction}
          onMouseDown={onPredictionClicked}
          isSelected={selectedIndex === index}
        />
      ))}
    </Paper>
  );
};

SearchPredictionList.propTypes = {
  classes: PropTypes.object,
  onPredictionClicked: PropTypes.func,
  predictions: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  isOpen: PropTypes.bool,
  selectedIndex: PropTypes.number
};

SearchPredictionList.defaultProps = {
  predictions: []
};

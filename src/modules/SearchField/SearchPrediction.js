import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

export const SearchPrediction = ({ prediction, onMouseDown, isSelected }) => {
  return (
    <MenuItem
      component="div"
      onMouseDown={() => onMouseDown(prediction)}
      selected={isSelected}
    >
      <span>{prediction.description}</span>
    </MenuItem>
  );
};

SearchPrediction.propTypes = {
  prediction: PropTypes.object,
  onMouseDown: PropTypes.func,
  isSelected: PropTypes.bool
};

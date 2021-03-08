// Defines common Slider component

import React from 'react';
import MaterialSlider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

export const Slider = ({ min, max, value, onChange }) => (
  <MaterialSlider
    // className="FormControl"
    value={value}
    min={min}
    max={max}
    onChange={event => onChange(parseInt(event.target.value, 0) | 0)}
  />
);

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
};
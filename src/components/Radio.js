// Defines common Radio component

import React from 'react';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';

export const RadioButton = ({ value, checked, onChange }) => (
  <Radio
    // className="FormControl"
    checked={checked}
    onChange={({ target }) => onChange(value, target.checked)}
  />
);

RadioButton.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

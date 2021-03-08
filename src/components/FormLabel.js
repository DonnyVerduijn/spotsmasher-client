// Defines common Body component

import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

export const FormLabel = ({ children, label }) => (
  <FormControlLabel
    // className="FormLabel"
    // classes={{ root: 'root', label: 'label' }}
    control={children}
    label={label}
  />
);

FormLabel.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string
};

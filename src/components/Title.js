// Defines common Title component

import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

export const Title = ({ children }) => (
  <Typography className="Title" variant="title">
    {children}
  </Typography>
);

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

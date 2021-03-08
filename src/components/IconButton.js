import React from 'react';
import MuiIconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

export default function IconButton({ onClick, className, icon: Icon }) {
  return (
    <MuiIconButton onClick={onClick} className={className} color="inherit">
      {Icon && <Icon />}
    </MuiIconButton>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.object
};

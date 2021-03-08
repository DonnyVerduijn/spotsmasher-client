import React from 'react';
import PropTypes from 'prop-types';
import MuiMenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';


export default function MenuItem({ text, Icon, onClick, children }) {
  return (
    <MuiMenuItem onClick={onClick}>
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      {text}
      {children}
    </MuiMenuItem>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any
};

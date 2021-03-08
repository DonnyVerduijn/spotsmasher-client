import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';

export const BadgedIconButton = ({ onClick, icon: Icon, badgeContent }) => {
  return (
    <IconButton onClick={onClick} color="inherit">
      <Badge badgeContent={badgeContent} color="secondary">
        {Icon && <Icon />}
      </Badge>
    </IconButton>
  );
};

BadgedIconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  badgeContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

import React from 'react';
import PropTypes from 'prop-types';
import MaterialUISearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  SearchIcon: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0
  }
}));

export default function SearchIcon() {
  const classes = useStyles();
  return (
    <div className={classes.SearchIcon}>
      <MaterialUISearchIcon />
    </div>
  );
}

SearchIcon.propTypes = {
  classes: PropTypes.object
};

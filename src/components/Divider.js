import React from 'react';
import MuiDivider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0),
    width: '100%'
  }
}));

const Divider = () => {
  const classes = useStyles();
  return <MuiDivider classes={classes} />;
};

export default Divider;
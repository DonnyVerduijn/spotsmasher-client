import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => {
  return {
    title: {
      overflow: 'visible',
      alignSelf: 'center',
      fontWeight: '700',
      color: theme.palette.common.white
    }
  };
});

export default function AppBarTitle({ text, className }) {
  const classes = useStyles();
  return (
    <Typography
      className={classNames(classes.title, className)}
      variant="h6"
      color="inherit"
      noWrap
    >
      {text}
    </Typography>
  );
}

AppBarTitle.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

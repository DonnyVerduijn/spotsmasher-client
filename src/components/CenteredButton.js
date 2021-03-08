import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1.25, 1.5),
    position: 'absolute',
    right: '50%',
    bottom: '50%',
    transform: 'translate(50%, 50%)'
  },
  label: {},
  text: {
    fontWeight: 700,
    marginRight: theme.spacing(0.5)
  }
}));

export default function CenteredButton({ text, icon: Icon, ...props }) {
  const classes = useStyles();
  return (
    <Button classes={classes} {...props}>
      <span className={classes.text}>{text}</span>
      {Icon && <Icon />}
    </Button>
  );
}

CenteredButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
  size: 'medium',
  text: 'buttonLabel',
};

CenteredButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object
};
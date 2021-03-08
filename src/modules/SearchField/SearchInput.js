import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),
    width: '100%',
  }
}));

export const SearchInput = ({ onChange, onBlur, onFocus, ...props }) => {
  const classes = useStyles();
  const input = useRef();
  return (
    <InputBase
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
      inputProps={{
        spellCheck: false,
        onChange,
        onBlur,
        onFocus
      }}
      inputRef={input}
      {...props}
    />
  );
};



SearchInput.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

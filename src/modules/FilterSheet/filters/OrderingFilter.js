import React, { memo } from 'react';
import { useLocalQuery } from '../../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { set as setOrderingFilter } from './../../../mutations/OrderingFilter';
import getOrderingFilter from './../../../queries/filters/getOrderingFilter';

const useInputStyles = makeStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4
    }
  }
}));

const Input = props => {
  const classes = useInputStyles();
  return <InputBase classes={classes} {...props} />;
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  FormControl: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row'
  }
}));

const OrderingFilter = () => {
  const classes = useStyles();
  const [setOrderingFilterHandler] = useMutation(setOrderingFilter, {
    ignoreResults: true
  });
  const OrderingFilterState = useLocalQuery(getOrderingFilter);

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.label}>
        Spot
      </Typography>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.FormControl}>
          <Select
            input={<Input name="sort-by" />}
            value={OrderingFilterState.column}
            onChange={event =>
              setOrderingFilterHandler({
                variables: { input: { column: event.target.value } }
              })
            }
          >
            <MenuItem value="DISTANCE">distance</MenuItem>
            <MenuItem value="CREATED_AT">most recent</MenuItem>
            <MenuItem value="TITLE">name</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default memo(OrderingFilter);

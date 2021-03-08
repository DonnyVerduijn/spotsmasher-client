import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FilterIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  FilterButton: {
    // margin: theme.spacing(1.5, 3)
  }
}));

const FilterButton = ({ visible, onClick }) => {
  const classes = useStyles();
  return visible ? (
    <Box className={classes.FilterButton}>
      <Button variant="outlined" color="primary" onClick={onClick}>
        <FilterIcon />
        Filter
      </Button>
    </Box>
  ) : null;
};

FilterButton.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  visible: PropTypes.bool
};

export default FilterButton;

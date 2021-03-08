import React, { memo } from 'react';
import { useLocalQuery } from '../../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { update as updateRangeFilter } from '../../../mutations/RangeFilter';
import getRangeFilter from '../../../queries/filters/getRangeFilter';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 3, 0)
  },
  label: {
    paddingBottom: theme.spacing(1)
  }
}));

const RangeFilter = () => {
  const classes = useStyles();
  const [update] = useMutation(updateRangeFilter, { ignoreResults: true });
  const RangeFilter = useLocalQuery(getRangeFilter);
  const [value, setValue] = React.useState(RangeFilter.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.label}>
        Range
      </Typography>
      <Grid item xs>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={() => update({ variables: { value } })}
          aria-labelledby="range-filter"
        />
        <p>{`${value} km`}</p>
      </Grid>
    </div>
  );
};

export default memo(RangeFilter);

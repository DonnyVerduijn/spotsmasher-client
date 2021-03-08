import React, { memo } from 'react';
import { useLocalQuery } from '../../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import { Typography, FormGroup } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { update as updateAttributeValue } from '../../../mutations/AttributeValue';
import getSpotObjectsFilter from '../../../queries/filters/getSpotObjectsFilter';
import getSpotOptionsFilter from '../../../queries/filters/getSpotOptionsFilter';
import CheckboxListItem from './../../../components/CheckboxListItem';
import { makeStyles } from '@material-ui/core/';

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

const SpotFilter = () => {
  const [update] = useMutation(updateAttributeValue, { ignoreResults: true });
  const SpotObjectsFilter = useLocalQuery(getSpotObjectsFilter);
  const SpotOptionsFilter = useLocalQuery(getSpotOptionsFilter);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.label}>
        Spot
      </Typography>
      <Divider />
      <Typography variant="subtitle1">Objects</Typography>
      {SpotObjectsFilter && (
        <FormGroup>
          {SpotObjectsFilter.attributes.map(input => (
            <CheckboxListItem
              key={input.id}
              id={input.id}
              label={input.name}
              checked={input.value}
              onChange={update}
            />
          ))}
        </FormGroup>
      )}
      <Divider />
      <Typography variant="subtitle1">Options</Typography>
      {SpotOptionsFilter && (
        <FormGroup>
          {SpotOptionsFilter.attributes.map(input => (
            <CheckboxListItem
              key={input.id}
              id={input.id}
              label={input.name}
              checked={input.value}
              onChange={update}
            />
          ))}
        </FormGroup>
      )}
    </div>
  );
};

export default memo(SpotFilter);

import React, { memo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '../../../utils/apollo/helpers';
import { Typography, FormGroup } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { update as updateAttributeValue } from '../../../mutations/AttributeValue';
import getParkDisciplinesFilter from '../../../queries/filters/getParkDisciplinesFilter';
import getParkOptionsFilter from '../../../queries/filters/getParkOptionsFilter';
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

const ParkFilter = () => {
  const [update] = useMutation(updateAttributeValue, { ignoreResults: true });
  const ParkDisciplinesFilter = useQuery(getParkDisciplinesFilter);
  const ParkOptionsFilter = useQuery(getParkOptionsFilter);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.label}>
        Park
      </Typography>
      <Divider />
      <Typography variant="subtitle1">Discipline</Typography>
      {ParkDisciplinesFilter && (
        <FormGroup>
          {ParkDisciplinesFilter.attributes.map(input => (
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
      {ParkOptionsFilter && (
        <FormGroup>
          {ParkOptionsFilter.attributes.map(input => (
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

export default memo(ParkFilter);

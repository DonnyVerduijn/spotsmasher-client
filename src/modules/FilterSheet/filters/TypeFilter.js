import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { useLocalQuery } from '../../../utils/apollo/helpers';
// import CheckboxGroup from '../../../components/CheckboxGroup';
import CheckboxListItem from './../../../components/CheckboxListItem'
import { update as updateAttributeValue } from '../../../mutations/AttributeValue';
import getTypeFilter from '../../../queries/filters/getTypeFilter';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormGroup
} from '@material-ui/core';

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

const TypeFilter = () => {
  const [update] = useMutation(updateAttributeValue, { ignoreResults: true });
  const TypeFilter = useLocalQuery(getTypeFilter);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.label}>
        type
      </Typography>
      {TypeFilter && (
        <FormGroup>
          {TypeFilter.attributes.map(input => (
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

TypeFilter.propTypes = {
  TypeFilter: PropTypes.object,
  updateAttributeValue: PropTypes.func
};

export default memo(TypeFilter);

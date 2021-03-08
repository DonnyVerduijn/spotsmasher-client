import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const CheckboxWithLabel = memo(({ label, id, checked, onChange }) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          color="primary"
          checked={checked}
          onChange={(el, value) => {
            console.log(id, value);
            onChange(value);
          }}
        />
      }
    />
  );
});

const CheckboxGroup = ({ inputs, onChange }) => {
  console.log(inputs);
  return (
    <FormGroup>
       {inputs.map(input => {
           
           return (
             <CheckboxWithLabel
               key={input.id}
               id={input.id}
               label={input.name}
               checked={input.value}
               onChange={onChange}
             />
           );
         })}
    </FormGroup>
  );
};

CheckboxGroup.propTypes = {
  inputs: PropTypes.array,
  onChange: PropTypes.func
};

CheckboxGroup.defaultProps = {
  inputs: []
};

export default memo(CheckboxGroup);

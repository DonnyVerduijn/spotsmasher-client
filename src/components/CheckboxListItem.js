import React, { memo } from 'react'
import { FormControlLabel,
Checkbox } from '@material-ui/core';

const CheckboxListItem = memo(({ label, id, checked, onChange }) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          color="primary"
          checked={checked}
          onChange={(el, value) => {
            onChange({ variables: { id, value } });
          }}
        />
      }
    />
  );
});

export default CheckboxListItem
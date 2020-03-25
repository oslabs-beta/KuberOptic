/**
 * ************************************
 *
 * @module  Checkbox.tsx
 * @author Timothy Mai
 * @date 10/21/19
 * @description creates a checkbox component
 *
 * ************************************
 */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Checkboxes(props) {
  // 'props' contains the following values:
  // value: 'some-location'
  // checked: Store.gpcloc['some-location']
  // handleChange: handleLocation function

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={props.handleChange(props.value)}
            value={props.value}
            color="primary"
          />
        }
        label={props.label}
      />
    </div>
  );
}

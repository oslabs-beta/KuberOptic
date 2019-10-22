/**
 * ************************************
 *
 * @module  Checkbox.tsx
 * @author
 * @date
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


  // original code from Material-UI below
  // I will instead pass down the state and functions from the parent
  // const [state, setState] = React.useState({
  //   checked: false,
  // });

  // const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [name]: event.target.checked });
  // };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox 
            checked={props.checked} 
            onChange={props.handleChange(props.value)} 
            value={props.value}
          />
        }
        label={props.value}
      />
    </div>
  );
}

/**
 * ************************************
 *
 * @module  app.tsx
 * @author
 * @date
 * @description main wrapper for entire app, provides access to state 
 *
 * ************************************
 */

import * as React from 'react';
import DisplayContainer from './DisplayContainer';
import '../styles.css';
import { StoreContextProvider } from '../../../store';;
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({ // will later import a theme object from a separate file instead
  palette: {
    primary: green
  }
}); 

function App() {
  // wraps the LandingPage inside the StoreContextProvider, which provides access to state
  // all this is wrapped in ThemeProvider, which provides the style theme
  return (
    <ThemeProvider theme={theme}>
      <StoreContextProvider>
        <div className='app'>
          <DisplayContainer/>
        </div>
      </StoreContextProvider>
    </ThemeProvider>
  );
}
export default App;

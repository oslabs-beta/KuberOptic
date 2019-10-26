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
// import 'tachyons'; // tachyons is a styling tool - not being used in the project
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({}); // will later import a theme object from a separate file instead

function App() {
  // wraps the LandingPage inside the StoreContextProvider, which provides access to state
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

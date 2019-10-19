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
import 'tachyons'; // tachyons is a styling tool - figure out if this is being used or not
// import LandingPage from './LandingPage';

function App() {
  // wraps the LandingPage inside the StoreContextProvider, which provides access to state
  return (
    <StoreContextProvider>
      <div className='app'>
        <DisplayContainer/>
        {/* <LandingPage/> */}
      </div>
    </StoreContextProvider>
  );
}
export default App;

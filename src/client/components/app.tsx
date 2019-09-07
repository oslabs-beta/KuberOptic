import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { useState, useEffect, useContext } from 'react';
// import { type } from 'os';
// import { BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import '../styles.css';
import { StoreContextProvider } from '../../../store';
import Visualizer from './visualizer'


function App() {
  return (
    <StoreContextProvider>
  <div className='app'>
    <LandingPage />
    
  </div>

  </StoreContextProvider>
  );
 

    

}
export default App;

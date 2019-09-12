import * as React from 'react';
import LandingPage from './LandingPage';
import '../styles.css';
import { StoreContextProvider } from '../../../store';;
import 'tachyons';
function App() {
  return (
    <StoreContextProvider>
  <div className='app'>
    <LandingPage/>
  </div>
  </StoreContextProvider>
  );




}
export default App;

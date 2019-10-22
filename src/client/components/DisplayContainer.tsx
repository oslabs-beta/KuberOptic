/**
 * ************************************
 *
 * @module  DisplayContainer.tsx
 * @author
 * @date
 * @description container for the visualizer or (possibly) deployment settings (?)
 *
 * ************************************
 */

import * as React from 'react';
// import Deploy from './gcpDeploy';
// import AWSDeploy from './awsDeploy';
import { useContext } from 'react';
import { StoreContext } from '../../../store';
import Visualizer from './visualizer'
import SideBar from './sidebar';
// import LandingPage from './LandingPage';

const DisplayContainer = () => {
  const [Store, setStore] = useContext(StoreContext);

  return (
    <div className='displayContainer'>
      <SideBar/>
      <Visualizer/>
      {/* { Store.gcpDeployPage ?
        <Deploy/> : 
        Store.awsDeployPage ?
        <AWSDeploy/> :
        <Visualizer />
      } */}
    </div>
  );
};

export default DisplayContainer;

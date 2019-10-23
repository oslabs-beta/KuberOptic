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
import Visualizer from './visualizer'
import SideBar from './sidebar';

const DisplayContainer = () => {
  return (
    <div className='displayContainer'>
      <SideBar/>
      <Visualizer/> 
    </div>
  )
}

export default DisplayContainer;

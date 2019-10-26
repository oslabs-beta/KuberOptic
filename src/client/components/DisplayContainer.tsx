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
import { useEffect, useRef, useContext }from 'react'
import {StoreContext} from '../../../store';


const DisplayContainer = () => {
  let [store, setStore] = useContext(StoreContext);

  return (
    <div className='displayContainer'>
      <SideBar/>
  { store.visualize && <Visualizer/> }
    </div>
  )
}

export default DisplayContainer;

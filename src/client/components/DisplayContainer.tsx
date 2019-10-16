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
import Deploy from './gcpDeploy';
import { useContext } from 'react';
import {StoreContext} from '../../../store';
import Visualizer from './visualizer'

const DisplayContainer = () => {
  const [Store, setStore] = useContext(StoreContext)
  console.log(Store)
    return (
      <div className='displayContainer'>
      { Store.gcpDeployPage ?
      <Deploy/> : 
      <Visualizer />
      }
    </div>
  ) // maybe go back and remove these parentheses later; don't think they're necessary -Tim
}

export default DisplayContainer;

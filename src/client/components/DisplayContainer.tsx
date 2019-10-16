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
    )
}



export default DisplayContainer;

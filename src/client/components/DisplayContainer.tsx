import * as React from 'react';
import Deploy from './gcpDeploy';
import { useContext } from 'react';
import {StoreContext} from '../../../store';
import Visualizer from './visualizer'

const DisplayContainer = () => {
  const [Store, setStore] = useContext(StoreContext)

    return (<div>{ Store.gcpDeployPage ? <Deploy/>:
        <div className='displayContainer'>
        <Visualizer />
        </div>
    }
    </div>
    )
}



export default DisplayContainer;

import * as React from 'react';
import Deploy from './gcpDeploy';
import { useState, useEffect, useContext } from 'react';
import {StoreContext} from '../../../store';
import Visualizer from './visualizer'
// "prestart": "rimraf dist && cross-env NODE_ENV=development webpack --watch --progress --colors & cross-env NODE_ENV=development",

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

/**
 * ************************************
 *
 * @module  UploadPage.tsx
 * @author
 * @date
 * @description upload page for clusters from Google Cloud Platform
 *
 * ************************************
 */

import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import DisplayContainer from './DisplayContainer';
import {StoreContext} from '../../../store';
const { ipcRenderer } = require('electron');
require('events').EventEmitter.defaultMaxListeners = 20;

const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);

  ipcRenderer.on('clusterClient', (event: any, arg: any) => {
    //logic incase we have more than one cluster already rendered    
    if (Store.clusters != null) {
      let newClusters = Store.clusters;
      if (Store.clusters.length === Store.clusterCount) {
        arg.forEach(el => {
          newClusters.push(el);
        });
      }

      setStore({...Store, clusters:newClusters});
    } else {
      setStore({...Store, clusters: arg, clusterCount: 1});
    }

    // setStore({...Store, clusters:arg});
    event.returnValue = 'done';
  });

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setStore({...Store, credentials:e.currentTarget.value});
  };
    
  const handleBack = () => {
    setStore({...Store, landingPageState:false});
  };
    
  const handleSubmit = () => {
    const creds = JSON.parse(Store.credentials);

    if (typeof creds !== 'object') {
      console.log('Enter a JSON object from GCP');
      console.log('locStore: ', Store.gcploc);
    } else {
      ipcRenderer.send('asynchronous-message', creds);
      setStore({...Store, uploadPageState: true});
    }
  }

  const handleLoc = (event) => {
    setStore({...Store, gcploc: event.currentTarget.value});
  }
    
  // if uploadPageState is true, then show DisplayContainer
  // else display main upload page content (for GCP)
  return <div>{Store.uploadPageState ? <DisplayContainer /> :
    <div className='uploadDiv'>
      <div>
        <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>
        <div className='kubUploadText'>Google Cloud Platform</div>
      </div>
        <input id="uploadEnterClustInfo" className='uploadInput' type="text" onChange={handleInput} placeholder="Enter Project Info"/>
        <div id="uploadDivForSubmitandBackButts">

        <button id="uploadSubmit" className='uploadButt' onClick={handleSubmit}> Submit </button>
        &nbsp;
        <button id="uploadBackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
      </div>
      
      <select id="uploadSelectMenu" className='loc' onChange={handleLoc}>
        <option>Select A Location</option>
        <option value='us-central1-a'>us-central1-a</option>
        <option value='us-central1-b'>us-central1-b</option>
        <option value='us-central1-c'>us-central1-c</option>
        <option value='southamerica-east1-a'>southamerica-east1-a</option>
        <option value='southamerica-east1-b'>southamerica-east1-b</option>
        <option value='southamerica-east1-c'>southamerica-east1-c</option>
        <option value='europe-west2-a'>europe-west2-a</option>
        <option value='us-west1-a'>us-west1-a</option>
      </select>
    </div>
  }</div>
}

export default UploadPage;

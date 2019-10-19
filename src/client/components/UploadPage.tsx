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
import { useContext } from 'react';
import DisplayContainer from './DisplayContainer';
import { StoreContext } from '../../../store';
const { ipcRenderer } = require('electron');
require('events').EventEmitter.defaultMaxListeners = 25;

const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);

  ipcRenderer.on('clusterClient', (event: any, arg: any) => {
    //logic incase we have more than one cluster already rendered
    if(Store.clusterCount){
      let newClusters = Store.clusters;
      arg.forEach(el=> newClusters.push(el))
      setStore({...Store, clusters: newClusters, clusterCount: newClusters.length })
    }
    else setStore({...Store, clusters: arg, clusterCount: arg.length });
    event.returnValue = 'done';
  })

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setStore({...Store, credentials:e.currentTarget.value});
  };
    
  const handleBack = () => {
    setStore({...Store, landingPageState:false});
  };
  
  const handleLoc = (event) => {
    setStore({...Store, gcploc: event.currentTarget.value});
  }
  
  const handleSubmit = () => {
    const creds = JSON.parse(Store.credentials); 
    if(typeof creds !== 'object'){
      console.log('Enter a JSON object from GCP');
      console.log('locStore: ', Store.gcploc)
    }
    else{
      ipcRenderer.send('asynchronous-message', creds, Store.gcploc)
      setStore({...Store, uploadPageState: true });
    }
  }
    
  return (
    <>
      { Store.uploadPageState ? 
      <DisplayContainer /> :
      <div className='uploadDiv'>
          <div className="gcpImageContainer">
            <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>
            <div className='kubUploadText'>Google Cloud Platform</div>
          </div>

        <div id="uploadDivForSubmitandBackButts">
          <input id="uploadEnterClustInfo" className='uploadInput' type="text" onChange={handleInput} placeholder="Enter Project Info" required={true}></input>
          <div className="buttonHolder">
            <button id="uploadSubmit" className='uploadButt' onClick={handleSubmit}> Submit </button>
            <button id="uploadBackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
          </div>
        </div>
        <div className="locationDropDown">
          <select id="uploadSelectMenu" className='loc' onChange={handleLoc}>
          <option>Select Zone</option>
          <option value='us-central1-a'>us-central 1-a</option>
          <option value='us-central1-b'>us-central 1-b</option>
          <option value='us-central1-c'>us-central 1-c</option>
          <option value='southamerica-east1-a'>southamerica-east 1-a</option>
          <option value='southamerica-east1-b'>southamerica-east 1-b</option>
          <option value='southamerica-east1-c'>southamerica-east 1-c</option>
          <option value='europe-west2-a'>europe-west 2-a</option>
          <option value='us-west1-a'>us-west 1-a</option>
          </select>
        </div>
      </div>
      }
    </>
  )
}

export default UploadPage;

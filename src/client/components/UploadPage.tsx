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
import { StoreContext } from '../../../store';
import GCPDeploy from './gcpDeploy';
import Deploying from './deploying';
require('events').EventEmitter.defaultMaxListeners = 25;

const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);
  
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setStore({...Store, credentials:e.currentTarget.value});
  };
    
  const handleBack = () => {
    setStore({
      ...Store,
      uploadPageState:false, 
      uploadPageState2:false,
      credentials: null,
      clusterCount: 0,
      clusters: []
    });
  };

  // functionalilty for pressing 'submit' button
  const handleSubmit = () => {
    const creds = JSON.parse(Store.credentials); 
    if (typeof creds !== 'object') {
      console.log('Enter a JSON object from GCP');
      console.log('locStore: ', Store.gcploc)
    }
    else setStore({...Store, gcpDeployPage: true });
  } 
    
  return (
    <>
      { Store.deploying ? <Deploying/> :
        Store.gcpDeployPage ? <GCPDeploy/> :
      <div className='uploadDiv'>
        <div className="gcpImageContainer">
        <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>
        <div className='kubUploadText'>Google Cloud Platform</div>
        </div>

        <div id="uploadDivForSubmitandBackButts">
          <input id="uploadEnterClustInfo" className='uploadInput' type="text" onChange={handleInput} placeholder="Enter GCP Info" required={true}></input>
          <div className="buttonHolder">
            <button id="uploadSubmit" className='uploadButt' onClick={handleSubmit}> Submit </button>
            <button id="uploadBackButt" className = 'backButton' onClick={handleBack}>  Back  </button>
          </div>
        </div>
      </div> 
      }
    </>
  )
}

export default UploadPage;

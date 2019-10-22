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
import GCPDeploy from './gcpDeploy';
const { ipcRenderer } = require('electron');
import Checkbox from './subcomponents/Checkbox';
require('events').EventEmitter.defaultMaxListeners = 25;

const UploadPage = () => {
  const [Store, setStore] = useContext(StoreContext);

  ipcRenderer.on('clusterClient', (event: any, arg: any) => {
    //logic incase we have more than one cluster already rendered
    // this was from the original team - check if this still works or not
    if(Store.clusterCount){
      let newClusters = Store.clusters;
      arg.forEach(el=> newClusters.push(el))
      setStore({...Store, clusters: newClusters, clusterCount: newClusters.length })
    }
    else setStore({...Store, clusters: arg, clusterCount: arg.length });
    event.returnValue = 'done';
  });

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setStore({...Store, credentials:e.currentTarget.value});
  };
    
  const handleBack = () => {
    setStore({...Store, landingPageState: false});
  };
  
  // function for handling location change
  const handleLocation = (location: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // updated to account for selecting multiple locations
    const newGcpLoc = Store.gcploc;
    newGcpLoc[location] = event.target.checked;

    setStore({
      ...Store, 
      gcploc: newGcpLoc,
    });
  }

  // making the options of locations to be displayed
  const deployLocationStrings = [
    'us-central1-a',
    'us-central1-b',
    'us-central1-c',
    'southamerica-east1-a',
    'southamerica-east1-b',
    'southamerica-east1-c',
    'europe-west2-a',
    'us-west1-a'
  ];

  // deployLocations is what will be rendered later
  // will be a bunch of checkboxes
  const deployLocations = [];

  deployLocationStrings.forEach(location => {
    deployLocations.push(
      <Checkbox 
        checked={Store[location]}
        handleChange={handleLocation}
        value={location}
        // maybe add a 'className' here, if needed
        // original class name: .loc
      />
    );
  });

  // functionalilty for pressing 'submit' button
  const handleSubmit = () => {
    const creds = JSON.parse(Store.credentials); 
    if (typeof creds !== 'object') {
      console.log('Enter a JSON object from GCP');
      console.log('locStore: ', Store.gcploc)
    }
    else {
      // ipcRenderer.send('asynchronous-message', creds, Store.gcploc)
      // setStore({...Store, uploadPageState: true });
      setStore({...Store, gcpDeployPage: true });
    }
  }

  return (
    <>
      { Store.gcpDeployPage ? <GCPDeploy/> :
        <div className='uploadDiv'>
          <div className="gcpImageContainer">
            <img className='kubUpload' src={require('../assets/credsPage/google.png')}/>
            <div className='kubUploadText'>Google Cloud Platform</div>
          </div>

          <div id='uploadSelectMenu'>
            {deployLocations}
          </div>

          <div id="uploadDivForSubmitandBackButts">
            <input id="uploadEnterClustInfo" className='uploadInput' type="text" onChange={handleInput} placeholder="Enter Project Info" required={true}></input>
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

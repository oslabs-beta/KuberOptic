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
      landingPageState: false,
      landingPageState2: false,
      credentials: null,
      clusterCount: 0,
      clusters: null
    });
  };
  
/* MOVE THE FOLLOWING TO A SEPARATE COMPONENT

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


  <div id='uploadSelectMenu'>
            {deployLocations}
          </div>

  */

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
      { Store.gcpDeployPage ? <GCPDeploy/> :
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

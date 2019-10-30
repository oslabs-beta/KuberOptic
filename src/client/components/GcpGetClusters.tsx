/**
 * ************************************
 *
 * @module  GcpGetClusters.tsx
 * @author
 * @date
 * @description upload page for clusters from Google Cloud Platform
 *
 * ************************************
 */

import * as React from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../../store';
import Checkbox from './subcomponents/Checkbox';
const { ipcRenderer } = require('electron');
require('events').EventEmitter.defaultMaxListeners = 25;

const GcpGetClusters = () => {
  const [Store, setStore] = useContext(StoreContext);
  // function for handling location changes as boxes are checked
  const handleLocation = (location: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // updated to account for selecting multiple locations
    const newGcpLoc = Store.gcploc;
    newGcpLoc[location] = event.target.checked;
    console.log(newGcpLoc)
    setStore({...Store, 
      gcploc: newGcpLoc,
    });
  }
  // GCP zones formatted in strings for front end boxes
  const labelsForFrontEnd = [
    'US Central (1A)',
    'US Central (1B)',
    'US Central (1C)',
    'US West (1A)',
    'S.America East (1A)',
    'S.America East (1B)',
    'S.America East (1C)',
    'Europe West (2A)'
  ]
  // making the options of locations to be displayed
  const deployLocationStrings = [
    'us-central1-a',
    'us-central1-b',
    'us-central1-c',
    'us-west1-a',
    'southamerica-east1-a',
    'southamerica-east1-b',
    'southamerica-east1-c',
    'europe-west2-a'
  ];
  // deployLocations is what will be rendered later
  // will be a bunch of checkboxes with text labels
  const deployLocations = [];
  deployLocationStrings.forEach((location, ind) => {
    deployLocations.push(
      <Checkbox 
        checked={Store[location]}
        handleChange={handleLocation}
        value={location}
        label={labelsForFrontEnd[ind]}
        // maybe add a 'className' here, if needed
        // original class name: .loc
      />
    );
  });

  const handleSubmit = () => {
    //begins pulling values that were made true in the store GCPLOC to tell google to bring those zones back
    const creds = JSON.parse(Store.credentials);
    const locations = Store.gcploc;
    const fetchMe = [];

    console.log('building array of locations ----')
    for (let zone in locations) {
      if (locations[zone]) {
        fetchMe.push(zone);
      }
    }
    //sends the credentials and locations to main to fetch from GCP
    ipcRenderer.send('asynchronous-message', creds, fetchMe)
    //turns on the Deploying/Fetching component to render until response is received,
    // also kills current Visualizer component to have it re-render on response below
    setStore({...Store,
      gcpDeployPage: false,
      clusters: [],
      clusterCount: 0,
      deploying: true, 
      visualize: false
    });
  }
  //response from GCP after telling it to fetch all or some zones
  ipcRenderer.on('clusterClient', (event: any, gcpClusters: any) => {
    //sets store with response from GCP and turns Visualizer component on to render
    setStore({...Store, 
      clusters: gcpClusters,
      clusterCount: gcpClusters.length,
      visualize: true,
      gcpDeployPage: true,
      deploying: false,
      gcploc: {
        'us-central1-a': false,
        'us-central1-b': false,
        'us-central1-c': false,
        'us-west1-a': false,
        'southamerica-east1-a': false,
        'southamerica-east1-b': false,
        'southamerica-east1-c': false,
        'europe-west2-a': false
      }
    })
    return event.returnValue = 'done';
  })

  return (
    <div className="getGCPWrapper">
      <h3 className="deployTitle">
        Display GCP Clusters:</h3> 
      <div id='uploadSelectMenu'>
        {deployLocations}
      </div>
      <div id='buts'>
        <button id="deploySubmit" className='uploadButtD' onClick={handleSubmit}> Fetch </button>
      </div>
    </div>
  )
}
export default GcpGetClusters;
